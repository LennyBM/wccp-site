#!/usr/bin/env node
// One-shot WebP generator. Walks public/images/products/ and writes a .webp
// sibling next to every .jpg / .jpeg / .png that doesn't already have one.
//
// Run with:  node scripts/generate-webp.mjs
//
// Idempotent — skips files where the .webp is newer than the source.

import { readdir, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..', 'public', 'images', 'products');

const SOURCE_EXTS = new Set(['.jpg', '.jpeg', '.png']);

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

let made = 0;
let skipped = 0;
let errored = 0;

for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (!SOURCE_EXTS.has(ext)) continue;
  const webp = file.slice(0, -ext.length) + '.webp';
  if (existsSync(webp)) {
    const srcM = statSync(file).mtimeMs;
    const dstM = statSync(webp).mtimeMs;
    if (dstM >= srcM) { skipped++; continue; }
  }
  try {
    await sharp(file).webp({ quality: 80, effort: 4 }).toFile(webp);
    made++;
    process.stdout.write(`✓ ${webp.replace(ROOT, '')}\n`);
  } catch (err) {
    errored++;
    process.stderr.write(`✗ ${file}: ${err.message}\n`);
  }
}

console.log(`\nDone. Created: ${made}, skipped: ${skipped}, errored: ${errored}`);
