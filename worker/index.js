/**
 * Cloudflare Worker — Azure Speech Pronunciation Assessment proxy
 *
 * Env vars (set via `wrangler secret put`):
 *   AZURE_KEY    — Azure Cognitive Services subscription key
 *   AZURE_REGION — e.g. "northeurope"
 *
 * Allowed origins: princeht.github.io and localhost (dev)
 */

const ALLOWED_ORIGINS = ['https://princeht.github.io', 'http://localhost'];

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const allowed = ALLOWED_ORIGINS.some(o => origin.startsWith(o));

    if (req.method === 'OPTIONS') {
      if (!allowed) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (req.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    if (!allowed) {
      return new Response('Forbidden', { status: 403 });
    }

    let word, audioBase64;
    try {
      ({ word, audioBase64 } = await req.json());
    } catch {
      return new Response('Invalid JSON body', { status: 400 });
    }

    if (!word || !audioBase64) {
      return new Response('Missing word or audioBase64', { status: 400 });
    }

    const pronCfg = btoa(JSON.stringify({
      ReferenceText: word,
      GradingSystem: 'HundredMark',
      Granularity: 'Phoneme',
      Dimension: 'Comprehensive',
      EnableMiscue: false,
    }));

    const azureUrl = `https://${env.AZURE_REGION}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US&format=detailed`;

    const wavBytes = Uint8Array.from(atob(audioBase64), c => c.charCodeAt(0));

    let azureRes;
    try {
      azureRes = await fetch(azureUrl, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': env.AZURE_KEY,
          'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
          'Pronunciation-Assessment': pronCfg,
        },
        body: wavBytes,
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Azure unreachable', detail: e.message }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
      });
    }

    const body = await azureRes.text();
    return new Response(body, {
      status: azureRes.status,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders(origin),
      },
    });
  },
};
