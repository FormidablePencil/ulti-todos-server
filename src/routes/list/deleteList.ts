import express from 'express'
import authUser from '../../middleware/authUser'
import ListModel from '../../models/list'
import RoomModel from '../../models/room'
import { missingFields } from '../reusables/responses'

const deleteList = express.Router()

const validateFields = (req, res, next) => {
  const { roomId, _id } = req.body
  if (!roomId || !_id) return missingFields(res, { roomId, _id })
  next()
}

deleteList.delete('/', authUser, validateFields, async (req, res) => {
  const { userAccessId, roomId, _id } = req.body

  const isAuthorizedInRoom = await RoomModel.findOne({ users: userAccessId, roomId })
  if (!isAuthorizedInRoom) return res.status(401).send('unauthorized')
  
  const foundList = await ListModel.findOne({ _id, roomIds: roomId })
  if (!foundList) return res.status(404).send('list not found')

  try {
    await ListModel.deleteOne({ _id })
    return res.status(200).send('Successfully deleted list!')
  } catch (error) {
    res.status(400).send('something went wrong!')
  }

})

export default deleteList