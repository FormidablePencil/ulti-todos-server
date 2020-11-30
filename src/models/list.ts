import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ListSchema = new Schema({
  creator: Number,
  title: String,
  todos: Array,
}, { timestamps: true })

const ListModel = mongoose.model('list', ListSchema)
export default ListModel