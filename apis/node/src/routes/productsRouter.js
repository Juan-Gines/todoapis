import express from 'express'
import * as productsController from '../controllers/productsController.js'

const productRouter = express.Router()

// Routes from products

productRouter.get('/', productsController.getProductsController)

export default productRouter
