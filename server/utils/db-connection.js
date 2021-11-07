const mongoose = require('mongoose')
require('dotenv').config()
const db = process.env.MONGO_URI

const connectToDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    console.log(`Successfully connected to Mongo ✅`)
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectToDB
