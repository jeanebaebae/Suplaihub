import { type Request, type Response } from "express";
import { supabase } from '../config/db.js';
import { hashPassword, comparePassword, generateToken, UserRole } from "../utils/auth.js";
import { createSupplier, createUser, findUserByEmail } from "../models/userModel.js";
import { User } from "@supabase/supabase-js";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, full_name, role, company_name, description } = req.body;

        if(!email || !password || !full_name || !role) {
            return res.status(400).json({
                status: 'error',
                message: 'Email, password, dan nama lengkap wajib diisi'
            });
        }
        if(role !== 'client' || role !== 'supplier') {
            return res.status(400).json({
                status: 'error',
                message: 'Role tidak cocok'
            });
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

        let supplierProfile = null;
        if(role === 'supplier') {
            supplierProfile = await createSupplier({
                user_id: newUser.id,
                company_name: company_name || full_name,
                description,
            });  
        }

        const token = generateToken({ 
            userId: newUser.id, 
            role: newUser.role
         });

        return res.status(201).json({
            status: 'success',
            message: 'Registrasi berhasil',
            data: {
                user: newUser,
                supplier: supplierProfile,
                token,
            },
        });
    } catch (error: any) {
        return res.status(500).json({
            status: 'error',
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Email dan password wajib diisi'
            });
        }

        const user = await findUserByEmail(email);
        if(!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Email dan password wajib diisi'
            });
        }

        const isPasswordValid = await comparePassword(password, user.password_hash);
        if(!isPasswordValid) {
            return res.status(401).json({
                status: 'error',
                message: 'Email atau password salah'
            });
        }

        const token = generateToken({
            userId: user.id,
            role: user.role
        });

        return res.status(200).json({
            status: 'success',
            message: 'Login berhasil',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    full_name: user.full_name,
                    role: user.role,
                },
                token,
            },
        });
    } catch (error: any) {
        return res.status(500).json({
            status: 'error',
            message: 'Gagal melakukan login',
            error: error.message
        })
    }
};