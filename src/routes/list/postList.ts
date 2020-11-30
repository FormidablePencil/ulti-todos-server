import express from 'express'
import authUser from '../../middleware/authUser'
const postList = express.Router()

postList.get('/', authUser, async (req, res) => {

  res.status(200).send('hi from postList route')
})

export default postList