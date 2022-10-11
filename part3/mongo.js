const mongoose = require('mongoose')

if(process.argv.length <= 2 || process.argv.length === 4) {
    console.log('Missing arguments')
}

if(process.argv.length > 5) {
    console.log('Too many arguments')
}

const pass = process.argv[2]

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)


if(process.argv.length === 3) {
    mongoose.connect(`mongodb+srv://myfirstdb-gm:${pass}@cluster0.pjdxboh.mongodb.net/?retryWrites=true&w=majority`)
        .then(response => {
            Person.find({})
                .then(response => {
                    console.log(`phonebook:`)

                    response.forEach((person) => {
                        console.log(`${person.name} ${person.number}`)
                    })

                    mongoose.connection.close()
                })
                .catch(e => {
                    console.log(e.message)
                })
        })
        .catch(e => {
            console.log(e.message)
        })
}

if(process.argv.length === 5) {
    mongoose.connect(`mongodb+srv://myfirstdb-gm:${pass}@cluster0.pjdxboh.mongodb.net/?retryWrites=true&w=majority`)
        .then(response => {
            const name = process.argv[3]
            const number = process.argv[4]
            const person = new Person({ name: name, number: number})
            person.save()
                .then(response => {
                    console.log(`added ${response.name} number ${response.number} to phonebook`)
                    mongoose.connection.close()
                })
                .catch(e => {
                    console.log(e.message)
                })
        })
        .catch(e => {
            console.log(e.message)
        })
}