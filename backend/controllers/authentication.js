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
module.exports = router
