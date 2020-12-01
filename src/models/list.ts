import mongoose, { Document, Model, Schema } from 'mongoose'

export interface ListModelT {
  title: string,
  todos: { [index: number]: string },
  keysOfLists: { [index: number]: string },
}

const ListSchema = new mongoose.Schema({
  title: String,
  todos: Array,
  keysOfLists: Array,
}, { timestamps: true })

const ListModel = mongoose.model<ListModelT & Document>('list', ListSchema)
export default ListModel