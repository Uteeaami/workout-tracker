const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let workouts = [{
    id: 1,
    theme: 'Full-body',
    date: '2022-12-22',
    duration: '1:30',
    movements: [
      {
      id: 1,
      name: 'Squat',
      weights: [100,120,140],
      sets: 3,
      reps: 5,
    },
    {
      id: 2,
      name: 'Bench-press',
      weights: [60, 80, 100, 110],
      sets: 4,
      reps: 8,
    },
    {
      id: 3,
      name: 'Pull-ups',
      weights: [5],
      sets: 5,
      reps: 5,
    }
  ],
    cardio: [{
      id: 1,
      name: 'Row',
      duration: '10min'
    }]
  },
  {
  id: 2,
  theme: 'Full-body',
  date: '2022-11-22',
  duration: '1:45',
  movements: [
    {
    id: 1,
    name: 'Squat',
    weights: [100,120,140],
    sets: 3,
    reps: 5,
  },
  {
    id: 2,
    name: 'Deadlift',
    weights: [60, 80, 100, 110],
    sets: 4,
    reps: 8,
  },
  {
    id: 3,
    name: 'Pull-ups',
    weights: [10,10,10,10],
    sets: 5,
    reps: 5,
  }
],
  cardio: [{
    id: 1,
    name: 'Row',
    duration: '10min'
  }]
}]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/workouts', (req, res) => {
    res.json(workouts)
  })

  app.get('/api/workouts/:id', (request, response) => {
    const id = Number(request.params.id)
    const workout = workouts.find(workout => workout.id === id)
    if(workout){
        response.json(workout)
    }else{
        response.status(404).end()
    }
  })

  app.delete('/api/workouts/:id', (request, response) => {
    const id = Number(request.params.id)
    workouts = workouts.filter(workout => workout.id !== id)
    response.status(204).end()
  })

  app.post('/api/workouts', (request, response) => {
    const body = request.body
    if(!body.theme){
        return response.status(400).json({ 
            error: 'content missing' 
          })
    }
    
    const maxId = workouts.length > 0
      ? Math.max(...workouts.map(w => w.id)) 
      : 0
    
    const workout = request.body
    workout.id = maxId + 1
  
    workouts = workouts.concat(workout)
  
    response.json(workout)
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})