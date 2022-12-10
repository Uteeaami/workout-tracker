require('dotenv').config()
const Workout = require('./models/workout')
const express = require('express')
const app = express()
const cors = require('cors')
const workout = require('./models/workout')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

  app.get('/', (req, res) => {
      res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/workouts', (req, res) => {
    Workout.find({}).then(workouts => {
      res.json(workouts)
    })
  })

  app.get('/api/workouts/:id', (request, response) => {
    Workout.findById(request.params.id)
    .then(workout => {
      if (workout) {
        response.json(workout)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
  })

  app.delete('/api/workouts/:id', (request, response) => {
    Workout.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  })

  app.post('/api/workouts', (request, response) => {
    const body = request.body
    if(!body.theme){
        return response.status(400).json({ 
            error: 'content missing' 
          })
    }
    
    const workout = new Workout({
      theme: body.theme,
      date: body.date,
      duration: body.duration,
      movements: body.movements,
      mname:body.mname,
      mweights:body.mweights,
      msets:body.msets,
      mreps: body.mreps,
      cardio: body.cardio,
      cname: body.cname,
      cduration: body.cduration
    })

    workout.save()
    .then(savedWorkout => {
      response.json(savedWorkout)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})