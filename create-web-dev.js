#!/usr/bin/env node
const { spawnSync } = require('child_process');

// Run the ES module script
const result = spawnSync('node', ['--experimental-modules', 'create-web-dev.mjs'], { stdio: 'inherit' });

if (result.error) {
  console.error('Error:', result.error.message);
  process.exit(1);
}
