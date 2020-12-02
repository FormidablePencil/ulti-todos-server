import ListModel, { ListModelT } from "../../models/list"
import RoomModel from "../../models/room"
import { v4 as uuidv4 } from 'uuid';

const generateStarterData = async (createdUserAccessId) => {
  const uuid = uuidv4()
  try {
    const newStarterList: ListModelT = {
      title: 'For starter',
      todos: [{ todo: 'Try inviting someone into your room', _id: uuidv4() }],
      roomIds: uuid
    }
    const createdList = new ListModel(newStarterList)

    const newStarterRoom = {
      title: 'Starter',
      users: [createdUserAccessId],
      roomId: uuid
    }
    const createdRoom = new RoomModel(newStarterRoom)

    await createdRoom.save()
    await createdList.save()

    return { generated: true, createdRoom, createdList }
  } catch (error) {
    return { generated: false, error }
  }
}

export default generateStarterData
