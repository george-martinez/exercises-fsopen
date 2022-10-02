const Filter = ({ newNameFilter, handleNameFilter }) => {
    return ( <h4>Filter shown with: <input value={newNameFilter} onChange={handleNameFilter} /></h4> )
}

export default Filter