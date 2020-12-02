import RoomModel from "../../../models/room"

const userAuthorizedRoom = async (userAccessId, roomId) => {
  const authenticated = (await RoomModel.find({ users: userAccessId })).filter((room: any) => room.roomId === roomId)
  if (authenticated[0]) return true
  else return false
}

export default userAuthorizedRoom