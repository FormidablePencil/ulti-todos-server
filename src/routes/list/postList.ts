import express from 'express'
import authUser from '../../middleware/authUser'
import ListModel from '../../models/list'
const postList = express.Router()

postList.post('/', authUser, async (req, res) => {
  const { userAccessId, title, todos } = req.body

  try {
    const createdList = new ListModel({
      creator: userAccessId,
      title,
      todos,
    })
    await createdList.save()
    res.status(202).send(createdList)
  } catch (error) {
    res.status(400).send(error)
  }
})

export default postList