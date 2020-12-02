import express from 'express'
import authUser from '../../middleware/authUser'
import ListModel from '../../models/list'
import { missingFields } from '../reusables/responses'
import userAuthorizedRoom from './functions/userAuthorizedRoom'

const updateTodos = express.Router()

const validateFields = (req, res, next) => {
  const { listId, roomId, updatedTodosList } = req.body
  if (!listId || !updatedTodosList || !roomId) return missingFields(res)
  next()
}

updateTodos.put('/update-todos', authUser, validateFields, async (req, res) => {
  const { listId, roomId, updatedTodosList, userAccessId } = req.body

  const userAuthorized = await userAuthorizedRoom(userAccessId, roomId)
  if (!userAuthorized) return res.status(200).send('unauthorized')
  try {
    const updatedList = await ListModel.updateOne({ _id: listId, roomIds: roomId }, { todos: updatedTodosList })
    await updatedList.save()
    res.status(200).send({ message: 'updated todos', updatedList })
  } catch (error) {
    res.status(500).send(error)
  }
})

export default updateTodos