import dotenv from 'dotenv';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Paksa baca file .env yang ada di folder backend
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const SUPABASE_URL = process.env.DATABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Debug log jika masih gagal
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.log('--- DEBUG ERROR ENV ---');
  console.log('Current Directory:', process.cwd());
  console.log('SUPABASE_URL:', SUPABASE_URL);
  console.log('SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY);
  console.log('-----------------------');
  throw new Error('.env kosong atau variabel Supabase tidak ditemukan');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);