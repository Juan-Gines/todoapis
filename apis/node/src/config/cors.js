const allowedOrigins = [process.env.ALLOW_ORIGIN_DEV]

const corsOptions = {
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}

export default corsOptions
