import UserModel from "../../../models/user"

const checkIfEmailAndUsernameAlreadyExist = async (username, email) => {
  const usernameAlready = await UserModel.findOne({ username })
  if (usernameAlready)
    return {
      alreadyExists: true,
      response: 'username already exists'
    }
  const foundExistingUsersByEmail = await UserModel.findOne({ email })
  if (foundExistingUsersByEmail) return {
    alreadyExists: true,
    response: 'an email already is used by another account'
  }
  return { alreadyExists: false, }
}
export default checkIfEmailAndUsernameAlreadyExist