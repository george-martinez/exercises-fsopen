const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
}))

let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    return response.status(200).json(data)
})

app.get('/info', (request, response) => {
    const date = new Date()
    const info = data.length

    return response.status(200).send(`<p>Phonebook has info por ${info} people.</p> <p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    if(!request.params.id) {
        return response.status(400).json('Bad request')
    }

    const id = Number(request.params.id)

    const person = data.find((person) => person.id === id)

    if(!person) {
        return response.status(404).end()
    }

    return response.status(200).json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    if(!request.params.id) {
        return response.status(400).json('Bad request')
    }

    const id = Number(request.params.id)

    data = data.filter(person => person.id !== id)

    return response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    if(!request.body.name || !request.body.number) {
        return response.status(400).json('Bad request, name or number missing')
    }

    const nameInUse = Boolean(data.find((person) => person.name === request.body.name))

    if(nameInUse) {
        return response.status(404).json({ error: 'name must be unique' })
    }

    const person = {
        id: (Math.floor(Math.random()*10000000)),
        name: request.body.name,
        number: request.body.number,
    }

    data.push(person)

    return response.status(200).json(person)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})