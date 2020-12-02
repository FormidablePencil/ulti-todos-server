import express from 'express'
import authUser from '../../middleware/authUser'
import ListModel from '../../models/list'
import RoomModel from '../../models/room'
import { missingFields } from '../reusables/responses'

const deleteList = express.Router()

deleteList.delete('/', authUser, async (req, res) => {
  const { userAccessId, roomId } = req.body
  if (!roomId) return missingFields(res)

  const allowedAccessToRoom = await RoomModel.findOne({ users: userAccessId, roomId })
  if (!allowedAccessToRoom) return res.status(401).send('unauthorized')

  try {
    await ListModel.deleteOne({ roomIds: roomId })
    res.status(200).send('successfully deleted')
  } catch (error) {
    res.status(400).send('something went wrong!')
    console.log(error)
  }

})

export default deleteList