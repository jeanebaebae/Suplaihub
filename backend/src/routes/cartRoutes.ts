import { Router } from 'express';
import {
    getCart,
    addToCart,
    updateQuantity,
    deleteItem,
    checkout,
} from '../controllers/cartController.js';
import { authenticateToken, requireRole } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authenticateToken, requireRole('client'));

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/item/:id', updateQuantity);
router.delete('/item/:id', deleteItem);
router.post('/checkout', checkout);

export default router;