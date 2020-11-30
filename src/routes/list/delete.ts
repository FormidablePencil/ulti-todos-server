import express from 'express'
import authUser from '../../middleware/authUser'
const deleteList = express.Router()

deleteList.delete('/', authUser, async (req, res) => {
  
  res.status(200).send('hi from deleteList route')
})

export default deleteList