import productSchema from '../schemas/productSchema.js'

// MongoDB Service
class ProductMongo {
  constructor (dbConnection) {
    this.Products = dbConnection.model('Product', productSchema)
  }

  async getAll () {
    try {
      const products = await this.Products.find()
      return products
    } catch (error) {
      throw new Error({ error: `Mongodb Error: ${error.message}` })
    }
  }

  async add (name) {
    try {
      const product = new this.Products({ name })
      await product.save()
      return await this.getAll()
    } catch (error) {
      throw new Error({ error: `Mongodb Error: ${error.message}` })
    }
  }

  async update (id, onbasket) {
    try {
      await this.Products.findOneAndUpdate({ _id: id }, { onbasket }, { new: true })
      return await this.getAll()
    } catch (error) {
      throw new Error({ error: `Mongodb Error: ${error.message}` })
    }
  }

  async delete (id) {
    try {
      await this.Products.deleteOne({ _id: id })
      return await this.getAll()
    } catch (error) {
      throw new Error({ error: `Mongodb Error: ${error.message}` })
    }
  }
}

export default ProductMongo
