import express from 'express'
import authUser from '../../middleware/authUser'
import RoomModel, { RoomModelT } from '../../models/room'
import { v4 as uuidv4 } from 'uuid';
import { missingFields } from '../reusables/responses';

const createRoom = express.Router()

const validateFields = (req, res, next) => {
  const { room } = req.body
  const { title, users } = room
  if (!room) return missingFields(res, { room })
  if (!title || !users) return missingFields(res, { title, users })
  next()
}

createRoom.post('/', authUser, validateFields, async (req, res) => {
  const { userAccessId, room: { title, users } } = req.body

  users.push(userAccessId)

  const newRoom: RoomModelT = {
    title,
    users,
    roomId: uuidv4()
  }
  const createdRoom = new RoomModel(newRoom)

  try {
    await createdRoom.save()
    res.status(202).send({ message: 'Saved new room!', createdRoom })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

export default createRoom