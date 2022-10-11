import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notifications from './components/Notifications'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newNameFilter, setNameFilter] = useState('')
  const [notificationInfo, setNotificationInfo] = useState({ message: null, classProp: null })

  useEffect(() => {
    personService
      .getAllContacts()
      .then(response => setPersons(response))
      .catch((e) => handleNotifications(`Error ${e.response.data}.`, 'error'))
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

  const handleNotifications = (message, classProp) => {
    setNotificationInfo({
      message: message,
      classProp: classProp
    })

    setTimeout(() => {
      setNotificationInfo({
        message: null,
        classProp: null
      })
    }, 3000)
  }
  
  const handleFormSubmit = (e) => {
    e.preventDefault()

    const nameMatch = persons.filter((person) => person.name === newName)

    if(nameMatch.length > 0) {
      if( window.confirm(`${newName} is already added to the phonebook, do you want to replace the old number with a new one?`) ){
        const personToUpdate = {
          name: newName, 
          number: newNumber
        }

        personService
          .updateContact(personToUpdate, nameMatch[0].id)
          .then(returnedPerson => {
            const newPersonsArr = persons.map((person) => person.id === returnedPerson.id ? returnedPerson : person)

            setPersons(newPersonsArr)
            setNewName('')
            setNewNumber('')

            handleNotifications(`Updated ${returnedPerson.name} number`, 'info')
          })
          .catch((e) => handleNotifications(`Error ${e.response.data.error}.`, 'error'))
      }
    } else {
        const newPerson = {
          name: newName, 
          number: newNumber
        }

        personService
          .saveContact(newPerson)
          .then(returnedPerson => {
            setPersons([...persons, returnedPerson])
            setNewName('')
            setNewNumber('')
            handleNotifications(`Added ${newPerson.name} number`, 'info')
          })
          .catch((e) => handleNotifications(`Error ${e.response.data.error}.`, 'error'))

    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newNameFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notifications notificationInfo={notificationInfo} setNotificationInfo={setNotificationInfo}/>

      <Filter newNameFilter={newNameFilter} handleNameFilter={handleNameFilter} />

      <h2>add a new contact</h2>
      <PersonForm handleFormSubmit={handleFormSubmit} newName={newName} handleNoteChange={handleNoteChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} persons={persons} setPersons={setPersons} handleNotifications={handleNotifications}/>
    </div>
  )
}

export default App