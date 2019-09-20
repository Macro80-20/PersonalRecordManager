const baseUrl = 'http://localhost:3002'

export function signup (user) {
    return fetch('http://localhost:3002/signup',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: user.name,
            email: user.email,
            password: user.password,
        })
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

export function fetchAlbums () {
    return fetch('http://localhost:3002/albums').then(resp => resp.json())
}


export function update (album,borrowee) {
    return fetch(`http://localhost:3002/albums/${album.userId}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: album.name,
            artist: album.artist,
            numberOfSongs: album.numberOfSongs,
            downloads: album.downloads,
            year: album.year,
            onLoan:  borrowee,
            songs: album.songs,
            albumCover: album.albumCover
        })
    }).then(resp => resp.json())
}


export default { signup, validate, getCollection, login, fetchAlbums ,update }
