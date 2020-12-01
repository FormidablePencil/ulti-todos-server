import mongoose, { Document } from 'mongoose'

export interface ListModelT {
  title: string,
  todos: { [index: number]: string },
  tag: {
    creator: string,
  }
}

const ListSchema = new mongoose.Schema({
  title: String,
  todos: Array,
  tag: {
    creator: String,
  }
}, { timestamps: true })

const ListModel = mongoose.model<ListModelT & Document>('list', ListSchema)
export default ListModel