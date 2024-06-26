import productSchema from '../schemas/productSchema.js'

// MongoDB Service
class ProductMongo {
  constructor (dbConnection) {
    this.Products = dbConnection.model('Product', productSchema)
  }

  async getAll () {
    const products = await this.Products.find()
    return products
  }
}

export default ProductMongo
