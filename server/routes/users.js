const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const User = require('../models/User')

router.get('/', async (_, res) => {
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

router.post(
  '/',
  // [
  //   check('name', 'Please add name').not().isEmpty(),
  //   check('email', 'Please enter  and email').isEmail(),
  // ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, phone, city, state, country, area } = req.body

    try {
      const newUser = new User({
        name,
        email,
        phone,
        city,
        state,
        country,
        area,
      })

      const user = await newUser.save()

      res.json(user)
    } catch (e) {
      /* handle error */
      console.error(e.message)
      res.status(500).send('Server Error')
    }
  }
)

router.put('/:id', async (req, res) => {
  const { name, email, phone, city, state, country, area } = req.body

  // Building user in case values not provided
  const userFields = {}
  if (name) userFields.name = name
  if (email) userFields.email = email
  if (phone) userFields.phone = phone
  if (city) userFields.city = city
  if (state) userFields.state = state
  if (country) userFields.country = country
  if (area) userFields.area = area
  console.log(userFields)

  try {
    let user = await User.findById(req.params.id)

    if (!user) return res.status(404).json({ msg: 'User not found' })

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    )
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.delete('/:id', async (req, res) => {
  try {
    let user = await User.findById(req.params.id)

    if (!user) return res.status(404).json({ msg: 'Contact not found' })

    await User.findByIdAndRemove(req.params.id)

    res.json({ msg: 'User removed from DB' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
