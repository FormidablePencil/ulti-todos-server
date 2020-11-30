import express from 'express'
import authUser from '../../middleware/authUser'
import RoomModel from '../../models/room'
const signIn = express.Router()
// userAccessId

signIn.post('/', authUser, async (req, res, next) => {
  const { userAccessId } = req.body

  const foundRooms = await RoomModel.find({ users: userAccessId })
  const foundLists = await RoomModel.find({ users: userAccessId })

  res.status(202).send({ foundRooms, foundLists })
})

export default signIn