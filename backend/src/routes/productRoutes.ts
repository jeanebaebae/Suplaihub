import { Router } from "express";
import { 
    getCategories,
    addProduct,
    getMyProduct,
    editProduct,
    removeProduct,
    getProducts,
 } from "../controllers/productController.js";
import { authenticateToken, requireRole } from "../middlewares/authMiddleware.js";

const router = Router();

// untuk publik (client & supplier)
router.get('/', getProducts);
router.get('/categories', getCategories);

// untuk supplier saja (protected)
router.use(authenticateToken, requireRole('supplier'));
router.get('/my-products', getMyProduct);
router.post('/', addProduct);

router.put('/:id', authenticateToken,editProduct);
router.delete('/:id', removeProduct);

export default router;
