// SQL Server Service

class ProductSqlServer {
  constructor (dbConnection) {
    this.dbConnection = dbConnection
  }

  async getAll () {
    const result = await this.dbConnection.request().query('SELECT * FROM products')
    return result.recordset
  }
}

export default ProductSqlServer
