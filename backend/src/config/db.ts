import dotenv from 'dotenv';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.log('--- DEBUG ERROR ENV ---');
  console.log('Current Directory:', process.cwd());
  console.log('SUPABASE_URL:', SUPABASE_URL);
  console.log('SUPABASE_ANON_KEY:', SUPABASE_KEY);
  console.log('-----------------------');
  throw new Error('.env empty');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);