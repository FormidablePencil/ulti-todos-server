import express from 'express'
import authUser from '../../middleware/authUser'
const getList = express.Router()

getList.get('/', authUser, async (req, res) => {
  
  res.status(200).send('hi from getList route')
})

export default getList