import mongoose, { Document } from 'mongoose'
import { arrayLimitOf1 } from './list'

export interface RoomModelT {
  title: string,
  users: {
    [index: number]: string
  },
  roomId: string,
}
//* get lists through rooms although you get all of your lists you've create as a user */
const RoomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  users: { type: Array, required: true, unique: true, validate: [arrayLimitOf1, '{PATH} recedes the limit of 1'] },
  roomId: { type: String, required: true, unique: true },
}, { timestamps: true })

// <RoomModelT & Document>
const RoomModel = mongoose.model('room', RoomSchema)
export default RoomModel