import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAllContacts = () => {
    const request = axios.get(baseUrl)

    return request.then(response => response.data)
}

const saveContact = newContact => {
    const request = axios.post(baseUrl, newContact)

    return request.then(response => response.data)
}

const deleteContact = id => {
    const request = axios.delete(`${baseUrl}/${id}`)

    return request.then(response => response.data)
}

const updateContact = (newContact, id) => {
    const request = axios.put(`${baseUrl}/${id}`, newContact)

    return request.then(response => response.data)
}

const allFunctions = { getAllContacts, saveContact, deleteContact, updateContact }

export default allFunctions