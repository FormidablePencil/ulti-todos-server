import express from 'express'
import authUser from '../../middleware/authUser'
import ListModel from '../../models/list'
import { missingFields } from '../reusables/responses'
import userAuthorizedRoom from './functions/userAuthorizedRoom'

const updateTodos = express.Router()

const validateFields = (req, res, next) => {
  const { listId, roomId, newTodoList } = req.body
  if (!listId || !newTodoList || !roomId) return missingFields(res, { listId, roomId, newTodoList })
  next()
}

updateTodos.put('/update-list', authUser, validateFields, async (req, res) => {
  const { listId, roomId, newTodoList, userAccessId } = req.body

  const userAuthorized = await userAuthorizedRoom(userAccessId, roomId)
  if (!userAuthorized) return res.status(200).send('unauthorized')

  try {
  const ifFound = await ListModel.findOne({ _id: listId, roomIds: roomId })
  if (!ifFound) return res.status(404).send('unauthorized')

    await ListModel.updateOne({ _id: listId, roomIds: roomId }, { $set: { todos: newTodoList } })
    res.status(200).send({ message: 'updated list' })
  } catch (error) {
    res.status(500).send(error)
  }
})

export default updateTodos