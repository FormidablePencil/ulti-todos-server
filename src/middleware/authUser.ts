/* //! later on, auth will be verified by tokens in bear header instead of passing password in to get requests and stuff */

import UserModel from "../models/user"

const authUser = async (req, res, next) => {
  const { username, password } = req.body

  const foundUser = await UserModel.findOne({ username })
  if (password !== foundUser[0].password) {
    return res.status(400).send('incorrect username or password')
  }
  req.body.userAccessId = foundUser[0].userAccessId
  next()
}

export default authUser
