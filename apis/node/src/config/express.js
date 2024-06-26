import express from 'express'
import cors from 'cors'
import selectDatabaseMiddleware from '../middleware/dbMiddleware.js'
import productsRouter from '../routes/productsRouter.js'
// import corsOptions from './cors'

const expressApp = express()

expressApp.disable('x-powered-by')

// Middlewares
expressApp.use(express.json())
expressApp.use(cors())
expressApp.use(selectDatabaseMiddleware)

// Routes
expressApp.use('/api/products', productsRouter)

export default expressApp
