import UserModel from "../models/user"
import bcrypt from 'bcrypt'

const authUser = async (req, res, next) => {
  const { username, token } = req.body

  const foundUser: any = await UserModel.findOne({ username })
  if (!foundUser)
    return res.status(404).send('user does not exist')

  if (!bcrypt.compare(token, foundUser.password)) {
    return res.status(400).send('incorrect username or password')
  }
  req.body.userAccessId = foundUser.userAccessId
  next()
}

export default authUser
