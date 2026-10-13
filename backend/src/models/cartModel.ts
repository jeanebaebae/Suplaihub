import { supabase } from "../config/db.js";

export interface CartItemEntity {
    id: string;
    cart_id: string;
    product_id: string;
    quantity: number;
    created_at?: string;
}

export const getOrCreateCart  = async (userId: string) => {
    const { data: existingCart } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', userId)
        .single();

    if(existingCart) return existingCart;
    
    const { data: newCart, error } = await supabase
        .from('carts')
        .insert({ user_id: userId })
        .select('id')
        .single();

    if(error || !newCart) throw new Error(error?.message || 'Gagal membuat cart')
    return newCart;
};

export const getCartByUser = async (userId: string) => {
    const cart = await getOrCreateCart(userId);

    const { data, error } = await supabase
        .from('cart_items')
        .select(`
            id,
            quantity,
            products (
                id,
                name,
                price,
                stock,
                unit,
                suppliers (
                company_name
                )
            )
        `)
        .eq('cart_id', cart.id);

        if(error) throw new Error(error.message);
        return { cart_id: cart.id, items: data };
};

export const addItemToCart = async (cartId: string, productId: string, quantity: number) => {
    const { data: existingItem } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('cart_id', cartId)
        .eq('product_id', productId)
        .single();

    // kalo item nya udah ada
    if(existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        const { data, error } = await supabase
            .from('cart_items')
            .update({ quantity: newQuantity })
            .eq('id', existingItem.id)
            .select('*')
            .single()

        if(error) throw new Error(error.message);
        return data;
    }

    const { data, error } = await supabase
        .from('cart_items')
        .insert({
            cart_id: cartId,
            product_id: productId,
            quantity,
        })
        .select('*')
        .single();

    if(error) throw new Error(error.message);
    return data;
};

export const updateItemQuantity = async (itemId: string, cartId: string, quantity: number) => {
    const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId)
        .eq('cart_id', cartId)
        .select('*')
        .single();
    
    if(error) throw new Error(error.message);
    return data;
};

export const removeCartItem = async (itemId: string, cartId: string) => {
    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)
        .eq('cart_id', cartId);
    
    if(error) throw new Error(error.message);
    return true;
};

// hilangkan items saat checkout barang
export const clearCart = async (cartId: string) => {
    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cartId);
    
    if(error) throw new Error(error.message);
    return true;
};