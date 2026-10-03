import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';
import { create } from "node:domain";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

if(!supabaseUrl || supabaseAnonKey) {
    throw new Error('.env kosong');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);