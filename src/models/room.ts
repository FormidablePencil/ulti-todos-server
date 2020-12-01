import mongoose, { Document } from 'mongoose'

export interface RoomModelT {
  title: string,
  users: { [index: number]: string },
  keysOfLists: { [index: number]: string },
}
//* get lists through rooms although you get all of your lists you've create as a user */
const RoomSchema = new mongoose.Schema({
  title: String,
  users: Array,
  keysOfLists: Array,
}, { timestamps: true })

const RoomModel = mongoose.model<RoomModelT & Document>('room', RoomSchema)
export default RoomModel