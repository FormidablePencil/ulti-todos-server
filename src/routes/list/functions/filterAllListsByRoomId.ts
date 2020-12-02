const filterAllListsByRoomId = (usersRooms, allLists) => {
  return usersRooms.map(room =>
    allLists.filter(list =>
      list.roomIds.filter(roomId => roomId === room.roomId)[0]))
}

export default filterAllListsByRoomId