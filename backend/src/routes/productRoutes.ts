import { Router } from "express";
import { 
    getCategories,
    addProduct,
    getMyProduct,
    editProduct,
    removeProduct,
 } from "../controllers/productController.js";
import { authenticateToken, requireRole } from "../middlewares/authMiddleware.js";

const router = Router();

// untuk client & supplier
router.get('/categories', getCategories);

// untuk supplier saja (protected)
router.use(authenticateToken, requireRole('supplier'));
router.get('/my-products', getMyProduct);
router.post('/', addProduct);
router.put('/:id', editProduct);
router.delete('/:id', removeProduct);

export default router;
