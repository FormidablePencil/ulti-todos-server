import express from 'express'
import authUser from '../../middleware/authUser'
import RoomModel from '../../models/room'
import { missingFields } from '../reusables/responses';

const getRoom = express.Router()

const validateFields = (req, res, next) => {
  const { roomId } = req.body
  if (!roomId) return missingFields(res, {roomId: ''})
  next()
}

getRoom.get('/', authUser, validateFields, async (req, res) => {
  const { roomId, userAccessId } = req.body

  const foundRoom = await RoomModel.findOne({ roomId, users: userAccessId })
  if (!foundRoom) res.status(404).send('room not found')

  res.status(200).send(foundRoom)
})

export default getRoom