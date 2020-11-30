import express from 'express'
import authUser from '../../middleware/authUser'
import RoomModel from '../../models/room'
const putRoom = express.Router()

//! I think this is insecure
putRoom.put('/', authUser, async (req, res) => {
  const { room, _id } = req.body

  try {
    let foundRoom = await RoomModel.updateOne({ _id, }, room)
    foundRoom.save()
  } catch (error) {
    console.log(error)
    res.status(400).send('error')
  }
})

export default putRoom