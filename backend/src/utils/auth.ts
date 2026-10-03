import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { bytes } from "node:stream/consumers";

const JWT_SECRET = process.env.JWT_SECRET || 'suplaihub_123';

export type UserRole = 'client' | 'supplier';

export interface JwtPayload {
    userId: string;
    role: UserRole;
};

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const comparePassword = (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

export const generateToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
