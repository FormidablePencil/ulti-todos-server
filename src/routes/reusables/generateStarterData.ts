import ListModel, { ListModelT } from "../../models/list"
import RoomModel from "../../models/room"

const generateStarterData = async (createdUserAccessId) => {
  try {
    const newStarterList: ListModelT = {
      title: 'For starter',
      todos: ['Fry inviting someone into your room'],
      tag: {
        creator: createdUserAccessId,
      }
    }
    const createdList = new ListModel(newStarterList)

    const newStarterRoom = {
      title: 'Starter',
      users: [createdUserAccessId],
      keysOfLists: [createdList._id],
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
