// SQL Server Service

class ProductSqlServer {
  constructor (dbConnection) {
    this.dbConnection = dbConnection
  }

  async getAll () {
    try {
      const res = await this.dbConnection.query('SELECT * FROM products')
      return res.recordset
    } catch (error) {
      throw new Error({ error: `SQL Server Error: ${error.message}` })
    }
  }

  async add (name) {
    try {
      const request = this.dbConnection.request()
      request.input('name', name)
      await request.query('INSERT INTO products (name) VALUES (@name)')
      return { name }
    } catch (error) {
      throw new Error({ error: `SQL Server Error: ${error.message}` })
    }
  }

  async update (id, onbasket) {
    try {
      const request = this.dbConnection.request()
      request.input('id', id)
      request.input('onbasket', onbasket)
      await request.query('UPDATE products SET onbasket = @onbasket WHERE id = @id')
      return { id, onbasket }
    } catch (error) {
      throw new Error({ error: `SQL Server Error: ${error.message}` })
    }
  }

  async delete (id) {
    try {
      const request = this.dbConnection.request()
      request.input('id', id)
      await request.query('DELETE FROM products WHERE id = @id')
      return { id }
    } catch (error) {
      throw new Error({ error: `SQL Server Error: ${error.message}` })
    }
  }
}

export default ProductSqlServer
