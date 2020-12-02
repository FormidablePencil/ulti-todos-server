import express from 'express'
import authUser from '../../middleware/authUser'
import RoomModel from '../../models/room'
import { missingFields } from '../reusables/responses';

const getRoom = express.Router()

//! not yet working
const validateFields = (req, res, next) => {
  const { roomId, users } = req.body
  if (!roomId || !users) return missingFields(res, { roomId: '' })
  next()
}

getRoom.get('/invite', authUser, validateFields, async (req, res) => {
  const { roomId, userAccessId, users } = req.body

  const foundRoom = await RoomModel.findOne({ roomId, users: userAccessId })
  if (!foundRoom) res.status(404).send('room not found')

  res.status(200).send(foundRoom)
})

export default getRoom