import mongoose from 'mongoose'

const { Schema } = mongoose

const productSchema = new Schema({
  name: String,
  onbasket: Boolean
})

export default productSchema
