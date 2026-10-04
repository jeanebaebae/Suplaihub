import { type Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware.js";
import { 
    getAllCategories,
    createProduct,
    getProductBySupplier,
    updateProduct,
    deleteProduct,
    findSupplierById
 } from "../models/productModel.js";

export const getCategories = async (_req: AuthenticatedRequest, res: Response) => {
    try {
        const categories = await getAllCategories();
        return res.status(200).json({ data: categories })
    } catch (error: any) {
        return res.status(500).json({ message: 'Gagal mengambil kategori', error: error.message })
    }
};

export const addProduct = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: 'User tidak teridentifikasi'});

        const supplier = await findSupplierById(userId);
        if(!supplier) return res.status(404).json({message: 'Supplier tidak ditemukan'});

        const { category_id, name, description, price, stock, unit } = req.body
        if(!name || price == undefined || stock == undefined) {
            return res.status(400).json({message: 'Nama, harga, dan stok waijb diisi'});
        }

        const newProduct = await createProduct({
            supplier_id: supplier.id,
            category_id,
            name,
            description,
            price: Number(price),
            stock: Number(stock),
            unit,
        });

        return res.status(201).json({message: 'Produk berhasil ditambahkan.', data: newProduct});
    } catch (error: any) {
        return res.status(500).json({message: 'Gagal menambah produk.', error: error.message});
    }
}

export const getMyProduct = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if(!userId) return res.status(401).json({message: 'User tidak teridentifikasi'});

        const supplier = await findSupplierById(userId);
        if(!supplier) return res.status(404).json({message: 'Supplier tidak ditemukan'});
        
        const products = await getProductBySupplier(supplier.id);
        return res.status(200).json({data: products})
    } catch (error: any) {
        return res.status(500).json({message: 'Gagal mengambil produk', error: error.message});
    }
};

export const editProduct = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;
        if(typeof id !== 'string') return res.status(400).json({message: 'ID tidak valid'});
        if(!userId) return res.status(401).json({message: 'User tidak teridentifikasi'});

        const supplier = await findSupplierById(userId);
        if(!supplier) return res.status(404).json({message: 'Supplier tidak ditemukan'});

        const updated = await updateProduct(id, supplier.id, req.body);
        return res.status(200).json({message: 'Produk berhasil diperbarui', data: updated});
        
    } catch (error: any) {
        return res.status(500).json({message: 'Gagal mengedit produk', error: error.message});
    }
};

export const removeProduct = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;
        if(typeof id !== 'string') return res.status(400).json({message: 'ID tidak valid'});
        if(!userId) return res.status(401).json({message: 'User tidak teridentifikasi'});

        const supplier = await findSupplierById(userId);
        if(!supplier) return res.status(404).json({message: 'Supplier tidak ditemukan'});

        await deleteProduct(id, supplier.id);
        return res.status(200).json({message: 'Produk berhasil dihapus'});
    } catch (error: any) {
        return res.status(500).json({message: 'Gagal menghapus produk', error: error.message});
    }
};




