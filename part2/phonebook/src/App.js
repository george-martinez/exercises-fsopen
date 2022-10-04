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
  const [notificationInfo, setNotificationInfo] = useState({ message: null, class: null })

  useEffect(() => {
    personService
      .getAllContacts()
      .then(response => setPersons(response))
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

  const handleNotifications = (operationType, personName) => {

    switch (operationType) {
      case 'update':
        setNotificationInfo({
          message: `Updated ${personName} number`,
          class: 'info'
        })
      break;

      case 'add':
        setNotificationInfo({
          message: `Added ${personName} number`,
          class: 'info'
        })
      break;
    
      default:
        break;
    }

    setTimeout(() => {
      setNotificationInfo({
        message: null,
        class: null
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

            handleNotifications('update', returnedPerson.name)
          })
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
          })

          handleNotifications('add', newPerson.name)
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
      <Persons personsToShow={personsToShow} persons={persons} setPersons={setPersons} setNotificationInfo={setNotificationInfo}/>
    </div>
  )
}

export default App