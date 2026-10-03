import { supabase } from "../config/db.js";
import { hashPassword, type UserRole } from "../utils/auth.js";

export interface UserEntity {
    id: string;
    email: string;
    password_hash: string;
    full_name: string;
    role: UserRole;
    created_at?: string;
    updated_at?: string;
}

export interface SupplierEntity {
    id: string;
    user_id: string;
    company_name: string;
    description?: string | null;
    category_id?: string | null;
}

export const findUserByEmail = async (email: string): Promise<UserEntity | null> => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

    if (error || !data) return null;
    return data as UserEntity;
}

export const createUser = async (userData: {
    email: string;
    password_hash: string;
    full_name: string;
    role: UserRole;
}): Promise<UserEntity> => {
    const { data, error } = await supabase
        .from('users')
        .insert({
          email: userData.email,
          password_hash: userData.password_hash,
          full_name: userData.full_name,
          role: userData.role  
        })
        .select('id, email, full_name, role')
        .select();
    
    if(error || !data) {
        throw new Error(error?.message || 'Gagal membuat akun')
    }

    return data as UserEntity;
}
