import { type Request, type Response } from "express";
import { supabase } from '../config/db.js';
import { hashPassword, comparePassword, generateToken, UserRole } from "../utils/auth.js";
import { createSupplier, createUser, findUserByEmail } from "../models/userModel.js";
import { User } from "@supabase/supabase-js";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, full_name, role, company_name, description } = req.body;

        if(!email || !password || !full_name || !role) {
            return res.status(400).json({message: 'Email, password, dan nama lengkap wajib diisi'});
        }
        if(role !== 'client' || role !== 'supplier') {
            return res.status(400).json({message: 'Role tidak cocok'});
        }
        
        const existingUser = await findUserByEmail(email);
        if(existingUser) {
            return res.status(400).json({message: 'Email sudah terdaftar'})
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await createUser({
            email,
            password_hash: hashedPassword,
            full_name,
            role: role as UserRole,
        });

        if(role === 'supplier') {
            await createSupplier({
                user_id: newUser.id,
                company_name: company_name || full_name,
                description,
            });  
        }

        const token = generateToken({ userId: newUser.id, role: newUser.role });

        return res.status(201).json({message: 'Registrasi berhasil', user: newUser, token});
    } catch (error: any) {
        return res.status(500).json({message: 'Terjadi kesalahan pada server', error: error.message});
    }
}
