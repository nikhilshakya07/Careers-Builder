/**
 * Seed script to import sample data
 * Run with: npx tsx scripts/seed.ts
 */

// IMPORTANT: Load environment variables FIRST, before any other imports
import { config } from 'dotenv';
import { join } from 'path';
import { readFileSync } from 'fs';
import { existsSync } from 'fs';

// Load environment variables from .env.local
const envPath = join(process.cwd(), '.env.local');
if (existsSync(envPath)) {
  config({ path: envPath });
  console.log('✅ Loaded environment variables from .env.local');
} else {
  console.error('❌ .env.local file not found!');
  console.error('   Please create .env.local with your Supabase credentials.');
  process.exit(1);
}

// Now import modules that use environment variables (using dynamic import to ensure env vars are loaded)

async function main() {
  try {
    // Dynamically import seedDatabase after env vars are loaded
    const { seedDatabase } = await import('../app/lib/db/seed');
    
    console.log('🌱 Starting seed process...');

    // Read sample data
    const dataPath = join(process.cwd(), 'data', 'sample-companies.json');
    const fileContent = readFileSync(dataPath, 'utf-8');
    const companies = JSON.parse(fileContent);

    console.log(`📦 Found ${companies.length} companies to seed`);

    // Seed database
    const result = await seedDatabase(companies);

    if (result.success) {
      console.log('✅ Seed completed successfully!');
      console.log(`   Created: ${result.created}`);
      console.log(`   Updated: ${result.updated}`);
      console.log(`   Errors: ${result.errors}`);
    } else {
      console.error('❌ Seed failed:', result.error);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();

