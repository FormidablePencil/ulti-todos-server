import express from 'express'
import authUser from '../../middleware/authUser'
import RoomModel from '../../models/room'
const getRooms = express.Router()

getRooms.get('/', authUser, async (req, res) => {
  const { _id } = req.body

  const rooms = await RoomModel.findOne({ _id })
  if (rooms[0])
    res.status(200).send(rooms)
  else
    res.status(404).send('not found')
})

export default getRooms