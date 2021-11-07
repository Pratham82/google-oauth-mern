const e = require('express')
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const verifyToken = require('../utils/verify-token')

router.post('/google-login', async (req, res) => {
  // Extract token which came from frontend
  const { tokenId } = req.body

  // Verify the token
  const response = await verifyToken(tokenId)
  const { email_verified, email } = response
  console.log(response)

  // Check if email is verified
  if (!email_verified) {
    res.status(400).send('Email not verified')
  } else {
    // Check if the user with the given email is present in the DB
    const user = await User.findOne({ email: email })
    console.log('User')
    if (user) {
      console.log(user)
      res.json({
        success: true,
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
