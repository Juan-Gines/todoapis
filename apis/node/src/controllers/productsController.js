import ProductMongo from '../services/productsServiceMongo.js'
import ProductMySql from '../services/productsServiceMySql.js'
import ProductPostgres from '../services/productsServicePostgres.js'
import ProductSqlServer from '../services/productsServiceSqlServer.js'

const getProductsController = async (req, res) => {
  try {
    let products
    switch (req.dbType) {
      case 'mongodb': {
        const productMongo = new ProductMongo(req.dbConnection)
        products = await productMongo.getAll()
        break
      }
      case 'mysql': {
        const productMySQL = new ProductMySql(req.dbConnection)
        products = await productMySQL.getAll()
        break
      }
      case 'postgres': {
        const productPostgres = new ProductPostgres(req.dbConnection)
        products = await productPostgres.getAll()
        break
      }
      case 'sqlserver': {
        const productSqlServer = new ProductSqlServer(req.dbConnection)
        products = await productSqlServer.getAll()
        break
      }
      default:
        throw new Error('Unsupported database type')
    }
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const addProductController = async (req, res) => {
  const { name } = req.body
  try {
    let product
    switch (req.dbType) {
      case 'mongodb': {
        const productMongo = new ProductMongo(req.dbConnection)
        product = await productMongo.add(name)
        break
      }
      case 'mysql': {
        const productMySQL = new ProductMySql(req.dbConnection)
        product = await productMySQL.add(name)
        break
      }
      case 'postgres': {
        const productPostgres = new ProductPostgres(req.dbConnection)
        product = await productPostgres.add(name)
        break
      }
      case 'sqlserver': {
        const productSqlServer = new ProductSqlServer(req.dbConnection)
        product = await productSqlServer.add(name)
        break
      }
      default:
        throw new Error('Unsupported database type')
    }
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateProductController = async (req, res) => {
  const { id } = req.params
  const { onbasket } = req.body
  try {
    let product
    switch (req.dbType) {
      case 'mongodb': {
        const productMongo = new ProductMongo(req.dbConnection)
        product = await productMongo.update(id, onbasket)
        break
      }
      case 'mysql': {
        const productMySQL = new ProductMySql(req.dbConnection)
        product = await productMySQL.update(id, onbasket)
        break
      }
      case 'postgres': {
        const productPostgres = new ProductPostgres(req.dbConnection)
        product = await productPostgres.update(id, onbasket)
        break
      }
      case 'sqlserver': {
        const productSqlServer = new ProductSqlServer(req.dbConnection)
        product = await productSqlServer.update(id, onbasket)
        break
      }
      default:
        throw new Error('Unsupported database type')
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteProductController = async (req, res) => {
  const { id } = req.params
  try {
    let product
    switch (req.dbType) {
      case 'mongodb': {
        const productMongo = new ProductMongo(req.dbConnection)
        product = await productMongo.delete(id)
        break
      }
      case 'mysql': {
        const productMySQL = new ProductMySql(req.dbConnection)
        product = await productMySQL.delete(id)
        break
      }
      case 'postgres': {
        const productPostgres = new ProductPostgres(req.dbConnection)
        product = await productPostgres.delete(id)
        break
      }
      case 'sqlserver': {
        const productSqlServer = new ProductSqlServer(req.dbConnection)
        product = await productSqlServer.delete(id)
        break
      }
      default:
        throw new Error('Unsupported database type')
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export {
  getProductsController,
  addProductController,
  updateProductController,
  deleteProductController
}
