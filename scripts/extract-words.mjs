import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const src = readFileSync(join(ROOT, 'app.js'), 'utf-8');

// Extract everything between "const WORDS = [" and the line "];"
// that ends the WORDS array (before WORD_MAP)
const startIdx = src.indexOf('const WORDS = [');
const endIdx   = src.indexOf('\nconst WORD_MAP', startIdx);
const rawArray = src.slice(startIdx + 'const WORDS = '.length, endIdx).trimEnd();

// Evaluate as JS to get a real array
// We wrap in a function to avoid polluting scope
const WORDS = (new Function(`return ${rawArray}`))();

console.log(`Extracted ${WORDS.length} words`);

// Sort by id just in case
WORDS.sort((a, b) => a.id - b.id);

const PART_SIZE = 50;
const NUM_PARTS = Math.ceil(WORDS.length / PART_SIZE);

mkdirSync(join(ROOT, 'data', 'level1'), { recursive: true });

for (let i = 0; i < NUM_PARTS; i++) {
  const part     = i + 1;
  const slice    = WORDS.slice(i * PART_SIZE, (i + 1) * PART_SIZE);
  const filename = `part${String(part).padStart(2, '0')}.json`;
  const outPath  = join(ROOT, 'data', 'level1', filename);
  writeFileSync(outPath, JSON.stringify(slice, null, 2), 'utf-8');
  console.log(`  wrote ${filename}  (ids ${slice[0].id}–${slice[slice.length-1].id})`);
}

// Also write a manifest so the app knows how many parts exist
const manifest = {
  level: 1,
  totalWords: WORDS.length,
  partSize: PART_SIZE,
  parts: NUM_PARTS,
};
writeFileSync(join(ROOT, 'data', 'level1', 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`\nmanifest.json written. Done!`);
