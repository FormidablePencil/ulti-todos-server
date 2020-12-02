import mongoose, { Document } from 'mongoose'

interface todoT {
  todo: string, _id: string,
}
export interface ListModelT {
  title: string,
  todos: todoT[],
  roomIds: {
    [index: number]: string
    forEach?: (item: any) => void
    filter?: (item: any) => void
  }
}

const TodoSchema = new mongoose.Schema({
  todo: { type: String, required: true },
  _id: { type: String, required: false },
})

const ListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  todos: [TodoSchema],
  roomIds: {
    type: Array,
    required: true,
    validate: [arrayLimitOf1, '{PATH} recedes the limit of 1']
  }
}, { timestamps: true })

export function arrayLimitOf1(val) {
  return val.length >= 1 && !val.filter(item => item === null)[0];
}

const ListModel = mongoose.model<ListModelT & Document>('list', ListSchema)
export default ListModel