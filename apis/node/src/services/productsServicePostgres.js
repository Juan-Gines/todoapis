// PostgreSQL Service

class ProductPostgres {
  constructor (dbConnection) {
    this.dbConnection = dbConnection
  }

  async getAll () {
    const res = await this.dbConnection.query('SELECT * FROM products')
    return res.rows
  }
}

export default ProductPostgres
