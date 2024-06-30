import connectToDatabase from '../config/db.js'

const selectDatabaseMiddleware = async (req, res, next) => {
  const dbType = req.headers['x-db-type']
  if (!dbType) {
    return res.status(400).json({ error: 'Database type header is required' })
  }

  if (!['mongodb', 'mysql', 'postgres', 'sqlserver'].includes(dbType)) {
    return res.status(400).json({ error: `Unsupported database type: ${dbType}` })
  }

  try {
    req.dbConnection = await connectToDatabase(dbType)
    req.dbType = dbType
    if (!req.dbConnection) {
      return res.status(500).json({ error: `Connection error to database: ${dbType}` })
    }
    next()
  } catch (error) {
    res.status(500).json({ error: `Connection error to database: ${dbType}` })
  }
}

export default selectDatabaseMiddleware
