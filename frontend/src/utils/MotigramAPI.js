const api = "http://localhost:8080"


const headers = {
    'Accept': 'application/json',
}

export const createUser = (username, email, password) =>
    fetch(`${api}/auth/signup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, email, password})
    })
    .then(res => res.json())
    .then(data => data)
            
export const loginUser = (username, password) =>
    fetch(`${api}/auth/login`, {
        method: 'POST',
        headers: {
            ...headers,
             'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    })
    .then(res => res.json())
    .then(data => data)
        



/**
 * From this point on, we require a token
 */


export const logoffUser = (id, token) =>
    fetch(`${api}/auth/logout`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ id })
    })
    .then(res => res.json())
    .then(data => data)


export const uploadImagePost = (body, token) =>
    fetch(`${api}/api/files`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body)
    }).then(res => res.json())

export const fetchImagesPost = (token) =>
    fetch(`${api}/api/posts`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            'Authorization': token
        },
    })
    .then(res => res.json())
    .then(data => data)


export const uploadProfilePic = (body, token) =>
    fetch(`${api}/api/uploadpic`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body)
    }).then(res => res.json())


export const getUserInfo = (userId, token) => 
    fetch(`${api}/api/getuser/${userId}`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            'Authorization': token
        },
    })
    .then(res => res.json())
    .then(data => data)

