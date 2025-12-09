import express from 'express';
import { createProduct, deleteProduct, getProducts, getProductsById, updateProduct } from '../controllers/productController.js';

const productionRouter = express.Router();
productionRouter.post('/', createProduct);
productionRouter.get('/', getProducts);
productionRouter.delete('/:productID', deleteProduct);
productionRouter.put('/:productID', updateProduct);
productionRouter.get('/:productID', getProductsById);

export default productionRouter;