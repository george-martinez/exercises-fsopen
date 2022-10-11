require('./mongodb')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./Models/Person.js')
const errorHandler = require('./Handlers/errorHandler')

const app = express()

app.use(express.static('build'))

app.use(express.json())

app.use(cors())

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

app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(persons => {
            return response.status(200).json(persons)
        })
        .catch(e => next(e))
})

app.get('/info', (request, response, next) => {
    const date = new Date()
    Person.count({})
        .then(info => {
            return response.status(200).send(`<p>Phonebook has info of ${info} people.</p> <p>${date}</p>`)
        })
        .catch(e => next(e))
})

app.get('/api/persons/:id', (request, response, next) => {
    if(!request.params.id) {
        return response.status(400).json('Bad request')
    }

    const id = request.params.id

    Person.findById(id)
        .then(person => {
            return response.status(200).json(person)
        })
        .catch(e => next(e))
})

app.delete('/api/persons/:id', (request, response, next) => {
    if(!request.params.id) {
        return response.status(400).json('Bad request')
    }

    const id = request.params.id

    Person.findByIdAndDelete(id)
        .then(deletedPerson => {
            return response.status(204).json(deletedPerson)
        })
        .catch(e => next(e))
})

app.post('/api/persons', (request, response, next) => {
    if(!request.body.name || !request.body.number) {
        return response.status(400).json('Bad request, name or number missing')
    }

    const person = new Person({
        name: request.body.name,
        number: request.body.number
    })

    person.save()
        .then(personSaved => {
            return response.status(201).json(personSaved)
        })
        .catch(e => next(e))
})

app.put('/api/persons/:id', (request, response, next) => {
    if(!request.params.id) {
        return response.status(400).json('Bad request')
    }

    if(!request.body.number){
        return response.status(400).json('Bad request')
    }

    const id = request.params.id
    const newNumber = request.body.number

    Person.findByIdAndUpdate(id, { number: newNumber }, { new: true, runValidators: true, context: 'query' })
        .then(personUpdated => {
            return response.status(200).json(personUpdated)
        })
        .catch(e => next(e))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})