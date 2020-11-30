const authUser = (req, res, next) => {
  const { username, password } = req.body
  if (username !== 'YourFace' || password !== 'Cornbread') {
    res.status(400).send('incorrect username or password')
  }
  next()
}

export default authUser
