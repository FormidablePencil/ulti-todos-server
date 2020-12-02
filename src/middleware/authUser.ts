import UserModel from "../models/user"
import bcrypt from 'bcrypt'
import { missingFields } from "../routes/reusables/responses"

const validateFields = (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return missingFields(res, { username, password })
  else return false
}

const authUser = async (req, res, next) => {
  if (validateFields(req, res)) return
  const { username, password } = req.body

  const foundUser: any = await UserModel.findOne({ username })
  if (!foundUser)
    return res.status(404).send('incorrect username or password')

  if (!await bcrypt.compare(password, foundUser.password))
    return res.status(400).send('incorrect username or password')

  req.body.userAccessId = foundUser.userAccessId
  next()
}

export default authUser
