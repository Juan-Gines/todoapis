// MySQL Service

class ProductMySql {
  constructor (dbConnection) {
    this.dbConnection = dbConnection
  }

  async getAll () {
    const [rows] = await this.dbConnection.query('SELECT * FROM products')
    return rows
  }
}

export default ProductMySql
