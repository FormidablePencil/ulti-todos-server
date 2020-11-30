import mongoose from 'mongoose'
const Schema = mongoose.Schema

const RoomSchema = new Schema({/* //* get lists through rooms allthough you get all of your lists you've create as a user */
  title: String,
  users: Array,
  keysOfLists: Array,
})

const RoomModel = mongoose.model('room', RoomSchema)
export default RoomModel