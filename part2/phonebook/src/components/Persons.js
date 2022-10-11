import personService from '../services/persons'


const Persons = ({ personsToShow, persons, setPersons, handleNotifications }) => {

    const handleDelete = (personToDelete) => {
        if (window.confirm(`Do you want to delete ${personToDelete.name}?`)) {
            personService
                .deleteContact(personToDelete.id)
                .catch((e) => handleNotifications(`${personToDelete.name} has already been deleted from server`, 'error'))

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

