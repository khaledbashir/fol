#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const VIOLATIONS = {
  FAKE_FUNCTIONALITY: [
    /setTimeout.*resolve.*\d+/g, // Simulated delays
    /mock|Mock|MOCK/g, // Mocked responses
    /thinking.*loading|loading.*thinking/gi, // Fake thinking states
    /fake.*data|mock.*data/gi, // Fake data
  ],
  PLACEHOLDER_FEATURES: [
    /coming.*soon|placeholder|TODO.*exposed/gi,
    /disabled.*cursor.*not.*allowed/gi,
    /opacity.*50.*disabled/gi,
  ],
  ERROR_MASKING: [
    /catch.*error.*console\.log.*something.*went.*wrong/gi,
    /catch.*error.*please.*try.*again/gi,
    /catch.*error.*return.*null/gi,
  ],
  LAZY_HACKS: [
    /\/\/.*TODO.*remove|\/\/.*FIXME.*temporary/gi,
    /hardcoded|hard.*code/gi,
    /magic.*number/gi,
  ],
  FAKE_INTEGRATIONS: [
    /simulated.*response|fake.*response/gi,
    /demo.*mode|mock.*integration/gi,
  ]
};

const EXTENSIONS_TO_CHECK = ['.ts', '.tsx', '.js', '.jsx'];
const IGNORE_DIRS = ['node_modules', '.next', 'dist', 'build'];

function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        findFiles(filePath, fileList);
      }
    } else if (EXTENSIONS_TO_CHECK.includes(path.extname(filePath))) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const violations = [];
  
  for (const [category, patterns] of Object.entries(VIOLATIONS)) {
    for (const pattern of patterns) {
      const matches = content.match(pattern);
      if (matches) {
        violations.push({
          category,
          pattern,
          matches,
          file: filePath
        });
      }
    }
  }
  
  return violations;
}

function main() {
  const stagedFiles = process.argv.slice(2);
  const filesToCheck = stagedFiles.length > 0 
    ? stagedFiles.filter(f => EXTENSIONS_TO_CHECK.includes(path.extname(f)))
    : findFiles('.');
  
  let totalViolations = 0;
  
  for (const file of filesToCheck) {
    if (!fs.existsSync(file)) continue;
    
    const violations = checkFile(file);
    if (violations.length > 0) {
      console.log(`\n🚨 VIOLATIONS in ${file}:`);
      totalViolations += violations.length;
      
      for (const violation of violations) {
        console.log(`\n  ❌ ${violation.category}:`);
        console.log(`     Pattern: ${violation.pattern}`);
        console.log(`     Found: ${violation.matches.length} occurrence(s)`);
      }
    }
  }
  
  if (totalViolations > 0) {
    console.log(`\n💥 ZERO BULLSHIT VIOLATIONS: ${totalViolations}`);
    console.log('\n📖 Read .roo-code-rules.md for guidance');
    console.log('🔨 Fix these violations before committing\n');
    process.exit(1);
  }
  
  console.log('✅ Zero bullshit check passed');
}

main();