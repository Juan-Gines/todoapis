import mongoose from 'mongoose'
import mysql from 'mysql2/promise'
import pkgMssql from 'mssql'
import pg from 'pg'

const { ConnectionPool } = pkgMssql
const { Client: PgClient } = pg

let mysqlConnection, postgresConnection, sqlServerConnection

const connectToDatabase = async (dbType) => {
  switch (dbType) {
    case 'mongodb':
      if (!global.mongoDBConnection) {
        global.mongoDBConnection = await mongoose.connect(process.env.MONGODB_URI)
      }
      return global.mongoDBConnection
    case 'mysql':
      if (!mysqlConnection) {
        mysqlConnection = mysql.createConnection({
          host: process.env.MYSQL_HOST,
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE
        })
      }
      return mysqlConnection
    case 'postgres':
      if (!postgresConnection) {
        postgresConnection = new PgClient({
          connectionString: process.env.POSTGRES_URI
        })
        await postgresConnection.connect()
      }
      return postgresConnection
    case 'sqlserver':
      if (!sqlServerConnection) {
        sqlServerConnection = new ConnectionPool({
          user: process.env.SQLSERVER_USER,
          password: process.env.SQLSERVER_PASSWORD,
          server: process.env.SQLSERVER_HOST,
          database: process.env.SQLSERVER_DATABASE,
          options: {
            encrypt: true,
            trustServerCertificate: true
          }
        })
        await sqlServerConnection.connect()
      }
      return sqlServerConnection
  }
}

export default connectToDatabase
