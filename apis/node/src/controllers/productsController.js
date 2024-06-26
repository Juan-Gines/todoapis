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
        await req.dbConnection.connection.close()
        break
      }
      case 'mysql': {
        const productMySQL = new ProductMySql(req.dbConnection)
        products = await productMySQL.getAll()
        await req.dbConnection.end()
        break
      }
      case 'postgres': {
        const productPostgres = new ProductPostgres(req.dbConnection)
        products = await productPostgres.getAll()
        await req.dbConnection.end()
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

export { getProductsController }
