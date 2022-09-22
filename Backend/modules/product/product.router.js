import { Router } from "express";
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from './controller/product.js';

const router = Router()

router.get('/', getProducts)
router.get('/:id', getProduct)
router.post('/', addProduct)
router.put('/:id',updateProduct)
router.delete('/:id',deleteProduct)

export default router