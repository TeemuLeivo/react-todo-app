import axios from 'axios'

const baseUrl = 'http://localhost:3001/todoitems'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newItem) => {
    const request = axios.post(baseUrl, newItem)
    return request.then(response => response.data)
}

const deleteItem = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updateItem = (item) => {
    const request = axios.put(`${baseUrl}/${item.id}`, item)
    return request.then(response => response.data)
}

export default { getAll, create, deleteItem, updateItem }