import express from 'express'
import authUser from '../../middleware/authUser'
import RoomModel from '../../models/room'
const getRooms = express.Router()

getRooms.get('/', authUser, async (req, res) => {
  const { username } = req.body

  //! useranme must be in array of usrs... if exists
  const rooms = await RoomModel.find({ user: username })
  if (rooms[0])
    res.status(200).send(rooms)
    else 
    res.status(404).send('not found')
})

export default getRoom