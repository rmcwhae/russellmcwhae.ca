// Simple check to see if the application structure is correct
const fs = require('fs');
const path = require('path');

console.log('Checking test files...');

// Check if test files exist
const testFiles = [
  'tests/01-basics.spec.ts',
  'tests/02-color-scheme.spec.ts', 
  'tests/03-journal.spec.ts',
  'tests/04-photos.spec.ts'
];

testFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✓ ${file} exists`);
  } else {
    console.log(`✗ ${file} missing`);
  }
});

// Check if playwright config exists
if (fs.existsSync('playwright.config.ts')) {
  console.log('✓ playwright.config.ts exists');
} else {
  console.log('✗ playwright.config.ts missing');
}

// Check if package.json has test scripts
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if (packageJson.scripts.test) {
  console.log('✓ Test script exists in package.json');
} else {
  console.log('✗ Test script missing in package.json');
}

console.log('Basic checks completed!');