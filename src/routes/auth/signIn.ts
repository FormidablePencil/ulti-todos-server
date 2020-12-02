import express from 'express'
import authUser from '../../middleware/authUser'
import ListModel from '../../models/list'
import RoomModel from '../../models/room'
import filterAllListsByRoomId from '../list/functions/filterAllListsByRoomId'

const signIn = express.Router()

signIn.post('/signIn', authUser, async (req, res) => {
  const { userAccessId } = req.body

  const usersRooms = await RoomModel.find({ users: userAccessId })
  const allLists = await ListModel.find()
  const allListsFromRoom = filterAllListsByRoomId(usersRooms, allLists)

  res.status(202).send({ usersRooms, allListsFromRoom })
})

export default signIn