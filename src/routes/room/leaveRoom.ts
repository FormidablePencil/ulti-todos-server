import express from 'express'
import authUser from '../../middleware/authUser'
import RoomModel from '../../models/room'
import { missingFields } from '../reusables/responses'

const leaveRoom = express.Router()

const validateFields = (req, res, next) => {
  const { roomId } = req.body
  if (!roomId) return missingFields(res, { roomId })
  next()
}

const userAuthorized = async (roomId, userAccessId) => {
  const foundRoom = await RoomModel.findOne({ roomId, users: userAccessId })
  if (!foundRoom) return false
  return true
}

leaveRoom.put('/leave', authUser, validateFields, async (req, res) => {
  const { userAccessId, roomId } = req.body

  if (!await userAuthorized(roomId, userAccessId))
    return res.status(404).send('not in room')

  try {
    await RoomModel.updateOne({ roomId }, { $pull: { users: userAccessId } })
    res.status(200).send('left room')
  } catch (error) {
    res.status(500).send(error)
  }
})


export default leaveRoom