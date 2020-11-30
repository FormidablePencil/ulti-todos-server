import express from 'express'
import authUser from '../../middleware/authUser'
import RoomModel from '../../models/room'
const deleteRoom = express.Router()

deleteRoom.delete('/', authUser, async (req, res) => {
  const { _id, userAccessId } = req.body

  try {
    await RoomModel.deleteOne({ _id, users: userAccessId })
    res.status(200).send('deleted room')
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
})

export default deleteRoom