import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware.js";
import {
    getOrCreateCart,
    getCartByUser,
    addItemToCart,
    updateItemQuantity,
    removeCartItem,
    clearCart,
 } from "../models/cartModel.js";

 export const getCart = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ 
            status: 'error', message: 'User tidak teridentifikasi.'
        });

        const cartData = getCartByUser(userId);
        return res.status(200).json({ 
            status: 'success', data: cartData
        });
    } catch (error: any) {
        return res.status(500).json({ 
            status: 'error', message: 'Gagal mengambil keranjang.', error: error.message 
        });
    }
 };

export const addToCart = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ status: 'error', message: 'User tidak teridentifikasi.' });

        const { product_id, quantity } = req.body;
        if (!product_id || !quantity || quantity <= 0) {
        return res.status(400).json({ 
            status: 'error', message: 'product_id dan quantity valid wajib diisi.' 
        });
        }

        const cart = await getOrCreateCart(userId);
        const item = await addItemToCart(cart.id, product_id, Number(quantity));

        return res.status(201).json({ 
            status: 'success', message: 'Produk berhasil ditambahkan ke keranjang.', data: item 
        });
    } catch (error: any) {
        return res.status(500).json({ 
            status: 'error', message: 'Gagal menambah item ke keranjang.', error: error.message 
        });
    }
}; 

 export const updateQuantity = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;
        const { quantity } = req.body;
        if (!userId) return res.status(401).json({ 
            status: 'error', message: 'User tidak teridentifikasi.'
        });

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ status: 'error', message: 'ID item tidak valid.' });
        }

        if(!quantity || quantity <= 0) {
            return res.status(400).json({ 
                status: 'error', message: 'Quantity harus lebih dari 0.'
            });
        }

        const cart = await getOrCreateCart(userId);
        const updatedItem = await updateItemQuantity(id, cart.id, Number(quantity));
        return res.status(200).json({ 
            status: 'success', message: 'Kuantitas item diperbarui.', data: updatedItem 
        });
        
    } catch (error: any) {
        return res.status(500).json({ 
            status: 'error', message: 'Gagal memperbarui keranjang.', error: error.message 
        });
    }
 };

 export const deleteItem = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const { id } = req.params; // cart_item_id

        if (!userId) return res.status(401).json({ 
            status: 'error', message: 'User tidak teridentifikasi.' 
        });

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ status: 'error', message: 'ID item tidak valid.' });
        }
        
        const cart = await getOrCreateCart(userId);
        await removeCartItem(id, cart.id);

        return res.status(200).json({ 
            status: 'success', message: 'Item berhasil dihapus dari keranjang.' 
        });
    } catch (error: any) {
        return res.status(500).json({ 
            status: 'error', message: 'Gagal menghapus item.', error: error.message 
        });
    }
};

export const checkout = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ status: 'error', message: 'User tidak teridentifikasi.' });

        const cart = await getOrCreateCart(userId);
        const { items } = await getCartByUser(userId);

        if (!items || items.length === 0) {
        return res.status(400).json({ status: 'error', message: 'Keranjang belanja Anda kosong.' });
        }

        // Kosongkan keranjang setelah checkout berhasil
        await clearCart(cart.id);

        return res.status(200).json({
        status: 'success',
        message: 'Checkout berhasil! Pesanan Anda telah disimulasikan.',
        });
    } catch (error: any) {
        return res.status(500).json({ status: 'error', message: 'Gagal melakukan checkout.', error: error.message });
    }
};