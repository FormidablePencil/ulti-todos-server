import express from 'express'
import authUser from '../../middleware/authUser'
import ListModel, { ListModelT } from '../../models/list'
import userAuthorizedRoom from './functions/userAuthorizedRoom'
import { missingFields } from '../reusables/responses';

const postList = express.Router()

const validateFields = (res, req, next) => {
  const { newList } = req.body
  if (!newList) return missingFields(res, { newList })
  const { title, todos, roomId } = newList
  if (!title || !todos || !roomId) return missingFields(res, { title, todos, roomId })
  next()
}

postList.post('/', authUser, validateFields, async (req, res) => {
  const { userAccessId, newList: { title, todos, roomId } } = req.body

  const authenticated = await userAuthorizedRoom(userAccessId, roomId)
  if (!authenticated) return res.status(400).send('Unauthorized')

  const newList: ListModelT = {
    roomIds: [roomId],
    title,
    todos,
  }

  try {
    const createdList = new ListModel(newList)
    await createdList.save()
    res.status(202).send(createdList)
  } catch (error) {
    res.status(500).send(error)
  }
})

export default postList