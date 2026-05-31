/**
 * Refactor app.js: remove embedded WORDS array, add lazy loadLevel1() loader.
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const appPath = join(ROOT, 'app.js');

let src = readFileSync(appPath, 'utf-8');

// ─── 1. Replace the WORDS section header + giant array + WORD_MAP line ────────
const wordsStart = src.indexOf('/* =================================================================\n   1) DỮ LIỆU TỪ VỰNG');
const wordMapLine = 'const WORD_MAP = Object.fromEntries(WORDS.map(w=>[w.id,w]));';
const wordMapIdx  = src.indexOf(wordMapLine);
if (wordsStart === -1 || wordMapIdx === -1) {
  console.error('Could not find WORDS section markers'); process.exit(1);
}
// Replace from section header to end of WORD_MAP line
const before = src.slice(0, wordsStart);
const after   = src.slice(wordMapIdx + wordMapLine.length);

const newWordsSection = `/* =================================================================
   1) DỮ LIỆU TỪ VỰNG — tải động từ data/level1/part01-20.json
   ================================================================= */
let WORDS = [];
const WORD_MAP = {};`;

src = before + newWordsSection + after;

// ─── 2. Add loadLevel1() + levelCache after the Store section ─────────────────
const storeEnd = '})();\n';
// Find the Store IIFE closing, then the next section comment
const storeIIFEEnd = src.indexOf('})();\n\n/* =================================================================\n   3) TRẠNG THÁI');
if (storeIIFEEnd === -1) {
  console.error('Could not find Store IIFE end'); process.exit(1);
}
const insertAfter = storeIIFEEnd + '})();\n'.length;

const loadLevel1Code = `
/* =================================================================
   2b) LAZY LOADER — tải từ vựng Level 1 từ 20 file JSON nhỏ
   ================================================================= */
const levelCache = {};
let level1Ready = false;

async function loadLevel1() {
  if (level1Ready) return;
  if (levelCache[1]) {
    WORDS = levelCache[1];
    level1Ready = true;
    return;
  }
  const manifest = await fetch('./data/level1/manifest.json').then(r => r.json());
  const parts = await Promise.all(
    Array.from({ length: manifest.parts }, (_, i) => {
      const n = String(i + 1).padStart(2, '0');
      return fetch(\`./data/level1/part\${n}.json\`).then(r => r.json());
    })
  );
  const words = parts.flat();
  words.forEach(w => { WORD_MAP[w.id] = w; });
  WORDS = words;
  levelCache[1] = words;
  level1Ready = true;
}

`;

src = src.slice(0, insertAfter) + loadLevel1Code + src.slice(insertAfter);

// ─── 3. Make startDeck async ──────────────────────────────────────────────────
src = src.replace(
  'function startDeck(kind){',
  `async function startDeck(kind){\n  if(!level1Ready) await loadLevel1();`
);

// ─── 4. Make startQuiz async ──────────────────────────────────────────────────
src = src.replace(
  'function startQuiz(kind){',
  `async function startQuiz(kind){\n  if(!level1Ready) await loadLevel1();`
);

// ─── 5. Load level1 in initAuth after user is determined ─────────────────────
// Patch: after "if(user) await loadFromFirestore();" add loadLevel1()
src = src.replace(
  'if(user) await loadFromFirestore();\n    view = user ? "home" : "login";',
  'if(user) await loadFromFirestore();\n    loadLevel1(); // start loading in background\n    view = user ? "home" : "login";'
);
// Also for guest path — fire and forget
src = src.replace(
  'function continueAsGuest(){ view = "home"; render(); }',
  'function continueAsGuest(){ loadLevel1(); view = "home"; render(); }'
);

writeFileSync(appPath, src, 'utf-8');
console.log('app.js refactored successfully.');
console.log('New size:', (src.length / 1024).toFixed(1), 'KB  (was 290KB)');
