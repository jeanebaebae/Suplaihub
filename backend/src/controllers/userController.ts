import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware.js";
import { findUserById, updateUserProfile, updateSupplierProfile } from "../models/userModel.js";

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if(!userId) {
            return res.status(401).json({ message: 'User tidak teridentifikasi '});
        }

        const user = await findUserById(userId);
        if(!user) {
            return res.status(404).json({ message: 'User tidak ditemukan '});
        }

        return res.status(200).json({ data: user });
    } catch (error: any) {
        return res.status(500).json({ message: 'Gagal mengambil profile', error: error.message });
    }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const role = req.user?.role;
        if(!userId) {
            return res.status(401).json({ message: 'User tidak teridentifikasi '});
        }

        const { full_name, company_name, description } = req.body;
        const updatedUser = await updateUserProfile(userId, { full_name });

        // kalo user adalah supplier dan ada input profil perusahaan
        let updatedSupplier = null;
        if(role === 'supplier' && (company_name || description)) {
            updatedSupplier = await updateSupplierProfile(userId, { company_name, description });
        }

        return res.status(200).json({
            message: 'Profil berhasil diperbarui',
            data: {
                user: updatedUser,
                supplier: updatedSupplier,
            }
        });
    } catch (error: any) {
        return res.status(500).json({
            message: 'Data gagal diperbarui',
            error: error.message
        })
    }
};



