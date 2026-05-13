#!/usr/bin/env node
// Re-decode mojibake produced when CP1252 bytes were mistakenly read as UTF-8.
// Usage: node scripts/fix-mojibake.mjs
//
// Strategy: for each suspicious sequence (anything starting with U+00E2 / U+00C2 / U+00C3
// followed by chars in the CP1252 range), we map each Unicode char back to the byte
// it would have been in CP1252, then decode the resulting byte sequence as UTF-8.
// If that yields a sane character (printable, not replacement char), we substitute.

import fs from 'node:fs';
import { execSync } from 'node:child_process';

// CP1252 → Unicode for bytes 0x80-0x9F (Windows-1252 specials).
// All other bytes (00-7F, A0-FF) map straight through (= ISO-8859-1).
const cp1252to = {
  0x80: 0x20AC, 0x82: 0x201A, 0x83: 0x0192, 0x84: 0x201E,
  0x85: 0x2026, 0x86: 0x2020, 0x87: 0x2021, 0x88: 0x02C6,
  0x89: 0x2030, 0x8A: 0x0160, 0x8B: 0x2039, 0x8C: 0x0152,
  0x8E: 0x017D,
  0x91: 0x2018, 0x92: 0x2019, 0x93: 0x201C, 0x94: 0x201D,
  0x95: 0x2022, 0x96: 0x2013, 0x97: 0x2014, 0x98: 0x02DC,
  0x99: 0x2122, 0x9A: 0x0161, 0x9B: 0x203A, 0x9C: 0x0153,
  0x9E: 0x017E, 0x9F: 0x0178,
};
// Reverse: Unicode → CP1252 byte.
const unicodeToByte = new Map();
for (let b = 0; b < 256; b++) {
  if (b in cp1252to) unicodeToByte.set(cp1252to[b], b);
  else unicodeToByte.set(b, b); // identity for ASCII + Latin-1 range
}

// A char qualifies as a CP1252-encodable mojibake fragment if we have a byte for it.
function canEncode(ch) {
  return unicodeToByte.has(ch.codePointAt(0));
}

// Convert a string of mojibake chars to bytes via CP1252, then decode as UTF-8.
// Returns null if the decode yields a U+FFFD replacement char (= invalid UTF-8).
function recode(seq) {
  const bytes = [];
  for (const ch of seq) {
    const b = unicodeToByte.get(ch.codePointAt(0));
    if (b === undefined) return null;
    bytes.push(b);
  }
  const decoded = new TextDecoder('utf-8', { fatal: false }).decode(Uint8Array.from(bytes));
  if (decoded.includes('�')) return null;
  return decoded;
}

// Sweep the string and replace mojibake runs.
function fix(input) {
  let out = '';
  let i = 0;
  while (i < input.length) {
    // A mojibake sequence starts with the lead byte for UTF-8 multi-byte chars
    // viewed as CP1252: 0xC2-0xF4 → Â Ã Ä Å ... etc.
    const c = input.charCodeAt(i);
    const isLead = c === 0xC2 || c === 0xC3 || c === 0xE2 || c === 0xE3 || c === 0xE2;
    if (!isLead) { out += input[i++]; continue; }

    // Try to consume the longest valid recodable run starting here.
    let best = null;
    let bestLen = 0;
    // Try lengths 2 to 4 (UTF-8 chars are at most 4 bytes; 0xC2/0xC3 lead = 2-byte char).
    const maxLen = c === 0xC2 || c === 0xC3 ? 2 : 4;
    for (let len = 2; len <= maxLen && i + len <= input.length; len++) {
      const seq = input.slice(i, i + len);
      if (![...seq].every(canEncode)) break;
      const decoded = recode(seq);
      if (decoded !== null && [...decoded].length === 1) {
        best = decoded;
        bestLen = len;
      }
    }

    if (best !== null) {
      out += best;
      i += bestLen;
    } else {
      out += input[i++];
    }
  }
  return out;
}

// ── Run across tracked files ────────────────────────────────────────────────
const tracked = execSync('git ls-files', { encoding: 'utf8', cwd: process.cwd() })
  .split('\n')
  .filter(Boolean)
  .filter(p => /\.(astro|md|ts|tsx|js|jsx|json|html|svg|xml|css|txt|mjs|cjs)$/.test(p));

let fixed = 0;
let skipped = 0;
for (const file of tracked) {
  let s;
  try { s = fs.readFileSync(file, 'utf8'); } catch { skipped++; continue; }
  const out = fix(s);
  if (out !== s) {
    fs.writeFileSync(file, out, 'utf8');
    const before = s.length, after = out.length;
    console.log(`fixed  ${file}  (${before} → ${after} chars)`);
    fixed++;
  }
}
console.log(`\nDone. ${fixed} files fixed, ${skipped} unreadable.`);
