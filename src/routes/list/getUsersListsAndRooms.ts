import express from 'express'
import authUser from '../../middleware/authUser'
import ListModel from '../../models/list'
import RoomModel from '../../models/room'
import filterAllListsByRoomId from './functions/filterAllListsByRoomId'

const getUsersListsAndRooms = express.Router()

getUsersListsAndRooms.get('/users-lists', authUser, async (req, res) => {
  const { userAccessId } = req.body

  const usersRooms = await RoomModel.find({ users: userAccessId })
  const allLists = await ListModel.find()
  const usersLists = filterAllListsByRoomId(usersRooms, allLists)

  if (!allLists[0] && !usersRooms[0]) res.status(204).send('on content')
  res.status(200).send({ usersRooms, usersLists })
})

export default getUsersListsAndRooms
