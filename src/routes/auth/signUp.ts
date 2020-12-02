import express from 'express'
import UserModel from '../../models/user'
import checkIfEmailAndUsernameAlreadyExist from './functions/checkIfEmailAndUsernameAlreadyExist'
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'
import generateStarterData from '../reusables/generateStarterData';
import { missingFields } from '../reusables/responses';

const signUp = express.Router()

signUp.post('/signUp', async (req, res, next) => {
  const { username, password, email } = req.body
  if (!username || !password || !email)
    return missingFields(res)

  const { alreadyExists, response } = await checkIfEmailAndUsernameAlreadyExist(username, email)
  if (alreadyExists) return res.status(400).send(response)

  const encryptedPw = await bcrypt.hash(password, 10)

  const createdNewUser: any = new UserModel({
    username,
    password: encryptedPw,
    email,
    userAccessId: uuidv4()
  })

  try {
    await createdNewUser.save()
  } catch (error) {
    return res.status(500).send(error)
  }

  const { createdRoom, createdList, generated, error } = await generateStarterData(createdNewUser.userAccessId)
  if (!generated) res.status(500).send(error)

  res.status(202).send({ message: 'created new user', createdRoom, createdList })
})

export default signUp


