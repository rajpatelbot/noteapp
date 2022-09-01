const mongoose = require('mongoose')

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  } catch (error) {
    console.log(error.message)
    process.exit()
  }
}

module.exports = connectToDB
