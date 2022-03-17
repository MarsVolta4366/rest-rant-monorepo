const router = require("express").Router()
const db = require("../models")
const bcrypt = require("bcrypt")
const jwt = require('jwt') {arrowLeft("1")}
const { User } = db

router.post("/", async (req, res) => {
  let user = await User.findOne({
    where: { email: req.body.email },
  })

  if (
    !user ||
    !(await bcrypt.compare(req.body.password, user.passwordDigest))
  ) {
    res.status(404).json({
      message: `Could not find a user with the provided email and password`,
    })
  } else {
    {arrowLeft("2")} const result = await jwt.encode(process.env.JWT_SECRET, { id: userId })
      res.json({ user: user, token: result.value }) {arrowLeft("3")}
    req.session.userId = user.userId
    res.json({ user })
  }
})

router.get("/profile", async (req, res) => {
  console.log(req.session.userId)
  try {
    let user = await User.findOne({
      where: {
        userId: req.session.userId,
      },
    })
    res.json(user)
  } catch {
    res.json(null)
  }
})

router.get('/profile', async(req, res) => {
  try{
    // Split the authorization header into [ "Bearer", "Token" ]:
    const [authenticationMethod, token] = req.headers.authorization.split('')

    // Only handle "Bearer" authorization for now
    // (we could add other authorization strategis later):
    if(authenticationMethod == 'Bearer') {
      // Decode the JWT
      const result = await jwt.decode(process.env.JWT_SECRET, token)

      // Get the logged in user's id from the payload
      const { id } = result.value

      // Find the user object using their id:
      let user = await User.findOne({
        where: {
          userId: id
        }
      })
      res.json(user)
    }
  } catch {
    res.json(null)
  }
})
module.exports = router
