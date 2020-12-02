import express from 'express'
import authUser from '../../middleware/authUser'
import RoomModel from '../../models/room'
import { missingFields } from '../reusables/responses';

const getListsFromRoom = express.Router()

const validateFields = (req, res, next) => {
  const { roomId } = req.body
  if (!roomId) return missingFields(res)
  next()
}

getListsFromRoom.get('/lists-from-room', authUser, validateFields, async (req, res) => {
  const { roomId, userAccessId } = req.body

  const foundRoom = await RoomModel.findOne({ roomId, users: userAccessId })
  if (!foundRoom) res.status(404).send('room not found')
  /* snippet */
  res


  res.status(200).send()
})

export default getListsFromRoom