import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ListSchema = new Schema({
  title: String,
  todos: Array,
  // ~ create timestamp of first created
  // ~ 
})

const ListModel = mongoose.model('list', ListSchema)
export default ListModel