import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const addComment = blogWithNewComment => {
	const { id, comments } = blogWithNewComment
	const request = axios.post(`${baseUrl}/${id}/comments`, {
		comment: comments[comments.length - 1],
	})

	return request.then(response => response.data)
}

const create = async newObject => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const update = newObject => {
	const config = {
		headers: { Authorization: token },
	}

	const newObjectCopy = { ...newObject }
	delete newObjectCopy.id
	delete newObjectCopy.user

	const request = axios.put(
		`${baseUrl}/${newObject.id}`,
		newObjectCopy,
		config
	)
	return request.then(response => response.data)
}

const getBlog = id => {
	const config = {
		headers: { Authorization: token },
	}

	const request = axios.get(`${baseUrl}/${id}`, config)
	return request.then(response => {
		delete response.data[0].user
		return response.data[0]
	})
}

const remove = id => {
	const config = {
		headers: { Authorization: token },
	}

	const request = axios.delete(`${baseUrl}/${id}`, config)
	return request.then(response => response.data)
}

const blogsFn = {
	getAll,
	create,
	update,
	setToken,
	remove,
	getBlog,
	addComment,
}

export default blogsFn
