import expressApp from './src/config/express.js'

const { PORT = 3000 } = process.env

const server = expressApp.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
})

export default server
