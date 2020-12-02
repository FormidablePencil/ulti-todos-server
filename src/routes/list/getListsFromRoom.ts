import express from 'express'
import authUser from '../../middleware/authUser'
import ListModel from '../../models/list';
import RoomModel, { RoomModelT } from '../../models/room'
import { missingFields } from '../reusables/responses';

const getRoom = express.Router()

const validateFields = (req, res, next) => {
  const { roomId } = req.body
  if (!roomId) return missingFields(res, { roomId: '' })
  next()
}

getRoom.get('/lists-from-room', authUser, validateFields, async (req, res) => {
  const { roomId, userAccessId } = req.body

  const foundRoom: any = await RoomModel.findOne({ roomId, users: userAccessId })
  if (!foundRoom) return res.status(401).send('Unauthorized')
  
  const allListsByRoomId = await ListModel.find({ roomIds: roomId })
  if (!allListsByRoomId[0]) return res.status(204).send('No content')

  res.status(200).send(allListsByRoomId)
})

export default getRoom