import personService from '../services/persons'


const Persons = ({ personsToShow, persons, setPersons, setNotificationInfo }) => {

    const handleDelete = (personToDelete) => {
        if (window.confirm(`Do you want to delete ${personToDelete.name}?`)) {
            personService.deleteContact(personToDelete.id)
            .catch(() => {
                setNotificationInfo({
                    message: `${personToDelete.name} has already been deleted from server`,
                    class: 'error'
                  })
                
                setTimeout(() => {
                    setNotificationInfo({
                        message: null,
                        class: null
                    })
                }, 3000)
            })
        
            const newPersons = persons.filter((newPerson) => newPerson.id !== personToDelete.id) 
    
            setPersons(newPersons)
        }
    }

    return ( 
        <div>
            {
            personsToShow.map((person) => {
                return(
                    <div key={person.name}>
                        <p>{person.name} {person.number} <button onClick={() => handleDelete(person)}>Delete</button></p>
                    </div>
                )
            })
            }
        </div>
    )
}

export default Persons

