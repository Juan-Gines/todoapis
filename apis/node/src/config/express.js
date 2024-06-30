import express from 'express'
import cors from 'cors'
import selectDatabaseMiddleware from '../middleware/dbMiddleware.js'
import productsRouter from '../routes/productsRouter.js'
import corsOptions from './cors.js'

const expressApp = express()

expressApp.disable('x-powered-by')

// Middlewares
expressApp.use(express.json())
expressApp.use(cors(corsOptions))
expressApp.use(selectDatabaseMiddleware)

// Routes
expressApp.use('/api/products', productsRouter)

export default expressApp
