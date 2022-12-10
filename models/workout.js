const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


  const workoutSchema = new mongoose.Schema({
    theme: String,
    date: String,
    duration: String,
    movements: [
      {
      mname: String,
      mweights:[Number],
      msets: Number,
      mreps: Number,
    },
  ],
    cardio: [{
      cname: String,
      cduration: String
    }]
  })

  workoutSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('workout', workoutSchema)