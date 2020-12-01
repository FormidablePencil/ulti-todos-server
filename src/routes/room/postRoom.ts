import express from 'express'
import authUser from '../../middleware/authUser'
import RoomModel, { RoomModelT } from '../../models/room'
const postRoom = express.Router()

postRoom.post('/', authUser, async (req, res) => {
  const { userAccessId, room: { title, users } } = req.body

  users.push(userAccessId)
  const newRoom: RoomModelT = {
    title: title,
    users: userAccessId,
    keysOfLists: []
  }
  const room = new RoomModel(newRoom)

  try {
    await room.save()
    res.status(202).send('Saved new room!')
  } catch (error) {
    console.log(error)
    res.status(400).send('something went wrong')
  }
})

export default postRoom