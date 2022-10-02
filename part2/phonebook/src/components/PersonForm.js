const PersonForm = ({ handleFormSubmit, newName, handleNoteChange, newNumber, handleNumberChange }) => {
    return ( 
        <form onSubmit={handleFormSubmit}>
            <div>
                name: <input value={newName} onChange={handleNoteChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form> 
    )
}

export default PersonForm