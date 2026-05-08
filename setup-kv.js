#!/usr/bin/env node

/**
 * Cloudflare KV Setup Script
 * Run this to set up KV namespaces for the BurrowSpace app
 */

const { execSync } = require('child_process');

console.log('🚀 Setting up Cloudflare KV namespaces for BurrowSpace...\n');

try {
  // Create FAQ KV namespace
  console.log('📝 Creating FAQ KV namespace...');
  const faqOutput = execSync('npx wrangler kv:namespace create "FAQS_KV"', {
    encoding: 'utf8',
    cwd: process.cwd()
  });
  console.log(faqOutput);

  // Create About KV namespace
  console.log('📝 Creating About KV namespace...');
  const aboutOutput = execSync('npx wrangler kv:namespace create "ABOUT_KV"', {
    encoding: 'utf8',
    cwd: process.cwd()
  });
  console.log(aboutOutput);

  console.log('✅ KV namespaces created successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Copy the namespace IDs from the output above');
  console.log('2. Update wrangler.jsonc with the actual IDs');
  console.log('3. Run: npx wrangler deploy');
  console.log('\n📖 See CLOUDFLARE_DEPLOYMENT.md for detailed instructions');

} catch (error) {
  console.error('❌ Error setting up KV namespaces:', error.message);
  console.log('\n💡 Make sure you have:');
  console.log('- Cloudflare account with Wrangler authenticated');
  console.log('- Node.js installed');
  console.log('- Run: npx wrangler auth login');
}