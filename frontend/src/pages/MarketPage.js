import React, { Component } from 'react'

import AlbumDetails from '../components/AlbumDetails'
import Albums from '../components/Albums'
import { fetchAlbums } from '../services/api'

export default class Market extends Component {
    state = {
    albums: [],
    selectedAlbum: {},
    }

    style = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'wrap'
    }


returnToAlbums = () => {
    this.setState({selectedAlbum: {}});
}

onClick = (albumId) => {
    const { albums } = this.state 
    let selectedAlbum = albums.find(album => album["id"] === albumId);
    this.setState({selectedAlbum: selectedAlbum})

}

borrowAlbum = (albumId) => {
    
}

renderAlbums = () => {
    return fetchAlbums()
    .then(data => {
        if (data.error) {
        alert(data.error)
        } else {
        this.setState({ albums: data })
        }
    })
}

componentDidMount () {
    this.renderAlbums();
    
}

render () {
    const { albums, selectedAlbum } = this.state
    const { onClick, returnToAlbums, borrowAlbum} = this

    const show = Object.entries(selectedAlbum).length >0
    ? (<AlbumDetails album={selectedAlbum} loan={borrowAlbum} returnToCollection={returnToAlbums}/>)
    : (<Albums onClick={onClick} albumCollection={albums}/>)

    return (
    <div style={this.style} className='user-list'>
    <h3>Which one Would you like to loan</h3>       
    {show}
    </div>
    )
}};