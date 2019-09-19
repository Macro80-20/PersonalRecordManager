const baseUrl = 'http://localhost:3002'
const userUrl = '/users' 
const albumUrl = '/albums' 
const loginUrl = baseUrl + userUrl+'/login'

export function signin (username, password) {
	return fetch(loginUrl, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }).then(resp => resp.json())
}

export function validate () {
    return fetch('http://localhost:3002/users/validate', {
	    headers: { 'authorisation': localStorage.token }
    }).then(resp => resp.json())
}

export function getCollection () {
    return fetch('http://localhost:3002/users/collection', {
	    headers: { 'authorisation': localStorage.token }
    }).then(resp => resp.json())
}

export default { signin, validate, getCollection }
