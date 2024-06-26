import connectToDatabase from '../config/db.js'

const selectDatabaseMiddleware = async (req, res, next) => {
  const dbType = req.headers['x-db-type']
  if (!dbType) {
    return res.status(400).json({ error: 'Database type header is required' })
  }

  try {
    req.dbConnection = await connectToDatabase(dbType)
    req.dbType = dbType
    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default selectDatabaseMiddleware
