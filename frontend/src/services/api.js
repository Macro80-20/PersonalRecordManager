const baseUrl = 'http://localhost:3002'
const loginUrl = baseUrl + '/login'

export function signin (email, password) {
	return fetch(loginUrl, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    }).then(resp => resp.json())
}

export function validate () {
    return fetch('http://localhost:3002/validate', {
	    headers: { 'authorisation': localStorage.token }
    }).then(resp => resp.json())
}

export function getCollection () {
    return fetch('http://localhost:3002/collection', {
	    headers: { 'authorisation': localStorage.token }
    }).then(resp => resp.json())
}

export function login (email, password) {
	return fetch('http://localhost:3002/login', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    }).then(resp => resp.json())
}

export default { signin, validate, getCollection, login }
