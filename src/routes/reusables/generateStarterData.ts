import ListModel, { ListModelT } from "../../models/list"
import RoomModel from "../../models/room"
import { v4 as uuidv4 } from 'uuid';

const generateStarterData = async (createdUserAccessId) => {
  try {
    const newStarterList: ListModelT = {
      title: 'For starter',
      todos: ['Fry inviting someone into your room'],
      keysOfLists: [createdUserAccessId],
    }
    const createdStarterList = new ListModel(newStarterList)

    const newStarterRoom = {
      title: 'Starter',
      users: [createdUserAccessId],
      keysOfLists: [createdStarterList._id],
    }
    const createdStarterRoom = new RoomModel(newStarterRoom)

    await createdStarterRoom.save()
    await createdStarterList.save()

    return { generated: true }
  } catch (error) {
    return { generated: false, error }
  }
}

export default generateStarterData
