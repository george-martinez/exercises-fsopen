import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newNameFilter, setNameFilter] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => setPersons(response.data))
  }, [])


  const handleNoteChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleNameFilter = (e) => {
    setNameFilter(e.target.value)
  }
  
  const handleFormSubmit = (e) => {
    e.preventDefault()

    if( persons.filter((person) => person.name === newName).length > 0 ) {
      alert(`${newName} is already in use`)
    } else {
      setPersons([...persons, {name: newName, number: newNumber}])
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newNameFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newNameFilter={newNameFilter} handleNameFilter={handleNameFilter} />

      <h2>add a new contact</h2>
      <PersonForm handleFormSubmit={handleFormSubmit} newName={newName} handleNoteChange={handleNoteChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App