import express from 'express'
import authUser from '../../middleware/authUser'
import ListModel from '../../models/list'
const deleteList = express.Router()

deleteList.delete('/', authUser, async (req, res) => {
  const { userAccessId } = req.body

  try {
    await ListModel.deleteOne({ creator: userAccessId })
    res.status(200).send('successfully deleted')
  } catch (error) {
    res.status(400).send('something went wrong!')
    console.log(error)
  }

})

export default deleteList