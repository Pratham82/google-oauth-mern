const express = require('express')
const router = express.Router()
const User = require('../models/User')
const verifyToken = require('../utils/verify-token')
const jwt = require('jsonwebtoken')

router.post('/google-login', async (req, res) => {
  // Extract token which came from frontend
  const { tokenId } = req.body

  // Verify the token
  const response = await verifyToken(tokenId)
  const { email_verified, email } = response.getPayload()
  console.log(response)

  // Check if email is verified
  if (email_verified !== true) {
    res.status(400).send('Email not verified')
  } else {
    // Check if the user with the given email is present in the DB
    const user = await User.findOne({ email: email })
    console.log('User')
    if (user) {
      console.log(user)
      const { name, email, phone, city, state, country, area } = user
      const payload = { name, email, phone, city, state, country, area }
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 3600,
      })
      console.log('Logging access token')
      console.log(accessToken)
      res.json({
        success: true,
        token: accessToken,
      })
    } else {
      res.status(400).send('User not found')
    }
  }
})

router.get('/logged-in-users', async (_, res) => {
  try {
    const users = await User.find({}).sort({
      date: -1,
    })
    res.json(users)
  } catch (e) {
    /* handle error */
    console.error(e.message)
    res.status(500).send('Server Error')
  }
})

router.get('/:id', async (req, res) => {
  try {
    let user = await User.findById(req.params.id)

    if (!user) return res.status(404).json({ msg: 'Contact not found' })

    await User.findById(req.params.id)

    res.json({ data: user })
  } catch (e) {
    /* handle error */
    console.error(e.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
