// MySQL Service

class ProductMySql {
  constructor (dbConnection) {
    this.dbConnection = dbConnection
  }

  async getAll () {
    try {
      const [rows] = await this.dbConnection.query('SELECT * FROM products')
      return rows
    } catch (error) {
      throw new Error({ error: `MySQL Error: ${error.message}` })
    }
  }

  async add (name) {
    try {
      await this.dbConnection.query('INSERT INTO products (name) VALUES (?)', [name])
      return { name }
    } catch (error) {
      throw new Error({ error: `MySQL Error: ${error.message}` })
    }
  }

  async update (id, onbasket) {
    try {
      await this.dbConnection.query('UPDATE products SET onbasket = ? WHERE id = ?', [onbasket, id])
      return { id, onbasket }
    } catch (error) {
      throw new Error({ error: `MySQL Error: ${error.message}` })
    }
  }

  async delete (id) {
    try {
      await this.dbConnection.query('DELETE FROM products WHERE id = ?', [id])
      return { id }
    } catch (error) {
      throw new Error({ error: `MySQL Error: ${error.message}` })
    }
  }
}

export default ProductMySql
