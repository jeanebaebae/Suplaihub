import { supabase } from "../config/db.js";

export interface ProductEntity {
    id: string;
    supplier_id: string;
    category_id?: string | null;
    name: string;
    description?: string | null;
    price: number;
    stock: number;
    unit?: string | null;
    is_active: boolean;
    created_at?: string;
}

export const findSupplierById = async (userId: string) => {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .single()
    
    if(error) throw new Error(error.message);
    return data;
};

export const getAllCategories = async () => {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) throw new Error(error.message);
  return data;
};

export const createProduct = async (productData: {
  supplier_id: string;
  category_id?: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  unit?: string;
}): Promise<ProductEntity[]> => {
    const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .eq('supplier_id', productData.supplier_id)
        .order('created_at', { ascending: false });
    
    if(error) throw new Error(error.message);
    return data as ProductEntity[];
};

export const getProductBySupplier = async (supplierId: string): Promise <ProductEntity[]> => {
    const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .eq('supplier_id', supplierId)
        .order('created at', { ascending: false })

    if (error) throw new Error(error.message);
    return data as ProductEntity[];
};

export const updateProduct = async (
    productId: string,
    supplierId: string,
    updateData: Partial<ProductEntity>  
) => {
    const { data, error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', productId)
        .eq('supplier_id', supplierId)
        .select('*')
        .single();

    if(error) throw new Error(error.message);
    return data;  
}

export const deleteProduct = async (
    productId: string,
    supplierId: string
) => {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)
        .eq('supplier_id', supplierId);

    if(error) throw new Error(error.message);
    return true;
}