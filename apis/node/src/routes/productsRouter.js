import express from 'express'
import * as productsController from '../controllers/productsController.js'

const productRouter = express.Router()

// Routes from products

productRouter.get('/', productsController.getProductsController)

productRouter.post('/', productsController.addProductController)

productRouter.patch('/:id', productsController.updateProductController)

productRouter.delete('/:id', productsController.deleteProductController)

export default productRouter
