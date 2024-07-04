// PostgreSQL Service

class ProductPostgres {
  constructor (dbConnection) {
    this.dbConnection = dbConnection
  }

  async getAll () {
    try {
      const res = await this.dbConnection.query('SELECT * FROM products')
      return res.rows
    } catch (error) {
      throw new Error({ error: `Postgres Error: ${error.message}` })
    }
  }

  async add (name) {
    try {
      await this.dbConnection.query('INSERT INTO products (name) VALUES ($1)', [name])
      return this.getAll()
    } catch (error) {
      throw new Error({ error: `Postgres Error: ${error.message}` })
    }
  }

  async update (id, onbasket) {
    try {
      await this.dbConnection.query('UPDATE products SET onbasket = $1 WHERE id = $2', [onbasket, id])
      return this.getAll()
    } catch (error) {
      throw new Error({ error: `Postgres Error: ${error.message}` })
    }
  }

  async delete (id) {
    try {
      await this.dbConnection.query('DELETE FROM products WHERE id = $1', [id])
      return this.getAll()
    } catch (error) {
      throw new Error({ error: `Postgres Error: ${error.message}` })
    }
  }
}

export default ProductPostgres
