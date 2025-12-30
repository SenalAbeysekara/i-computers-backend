import express from 'express';
import { createProduct, deleteProduct, getProducts, getProductsById, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();
productRouter.post('/', createProduct);
productRouter.get('/', getProducts);
productRouter.delete('/:productID', deleteProduct);
productRouter.put('/:productID', updateProduct);
productRouter.get('/:productID', getProductsById);

export default productRouter;