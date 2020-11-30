import express from 'express'
import UserModel from '../../models/user'
import { v4 as uuidv4 } from 'uuid';

const signUp = express.Router()

signUp.post('/', async (req, res, next) => {
  const { username, password, email } = req.body

  const usernameAlready = await UserModel.findOne({ username })
  if (usernameAlready[0]) return res.status(400).send('username already exists')

  const foundExistingUsersByEmail = await UserModel.findOne({ email })
  if (foundExistingUsersByEmail[0]) return res.status(400).send('an email already is used by another account')

  const createdNewUser = new UserModel({ username, password, email, userAccessId: uuidv4() })

  try {
    await createdNewUser.save()
  } catch (error) {
    return res.status(400).send(error)
  }

  //* create dummy data; 1 room. 1 todo */

  res.status(202).send('created new user')
})

export default signUp