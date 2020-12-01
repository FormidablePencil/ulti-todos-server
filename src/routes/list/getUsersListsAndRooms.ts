import express from 'express'
import authUser from '../../middleware/authUser'
import ListModel from '../../models/list'
import RoomModel from '../../models/room'
const getUsersListsAndRooms = express.Router()

getUsersListsAndRooms.get('/users-lists-and-rooms', authUser, async (req, res, next) => {
  const { userAccessId } = req.body

  const usersLists = await ListModel.find({ tag: { creator: userAccessId } })
  const usersRooms = await RoomModel.find({ users: userAccessId })

  if (!usersLists[0] && !usersRooms[0]) res.status(204).send('on content')
  res.status(200).send({ usersLists, usersRooms })
})

export default getUsersListsAndRooms