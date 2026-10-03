import { type Request, type Response, type NextFunction } from 'express';
import { verifyToken, JwtPayload, UserRole } from '../utils/auth.js';
import type { User } from '@supabase/supabase-js';

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
};

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // ambil authorization dari HTTP header
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'Token tidak ditemukan'});
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({message: 'Token tidak valid'});
    }
};

export const requireRole = (role: UserRole) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if(!req.user || req.user.role !== role) {
            return res.status(403).json({message: 'Akses ditolak'});
        }
        next();
    }
};

