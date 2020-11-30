import express from 'express'
import authUser from '../../middleware/authUser'
const putList = express.Router()

putList.put('/', authUser, async (req, res) => {
  
  res.status(200).send('hi from putList route')
})

export default putList