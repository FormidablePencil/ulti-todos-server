import express from 'express'
import authUser from '../../middleware/authUser'
import RoomModel from '../../models/room'
const getRoomsByUser = express.Router()

getRoomsByUser.get('/users-rooms', authUser, async (req, res) => {
  const { userAccessId } = req.body
  const rooms = await RoomModel.find({ users: userAccessId })
  if (rooms[0])
    res.status(200).send(rooms)
  else
    res.status(404).send('not found')
})

export default getRoomsByUser