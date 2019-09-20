import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

import AlbumDetails from '../components/AlbumDetails'
import Albums from '../components/Albums'
import { getCollection } from '../services/api'

export default class Collection extends Component {
  state = {
    albumCollection: [],
    selectedAlbum: {},
  }

  style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap'
  }


  returnToCollection = () => {
    this.setState({selectedAlbum: {}});
  }

  onClick = (albumId) => {
    const { albumCollection } = this.state 
    let selectedAlbum = albumCollection.find(album => album["id"] === albumId);
    this.setState({selectedAlbum: selectedAlbum})

  }

  renderCollection = () => {
    return getCollection()
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          this.setState({ albumCollection: data })
        }
      })
  }

  componentDidMount () {
    if(!this.props.email){
      this.props.history.push('/signin')
    }else{
      this.renderCollection();
    }
  }
  render () {
    const { albumCollection, selectedAlbum } = this.state
    const { onClick, returnToCollection} = this

    const show = Object.entries(selectedAlbum).length >0
    ? (<AlbumDetails album={selectedAlbum} returnToCollection={returnToCollection}/>)
    : (<Albums onClick={onClick} albumCollection={albumCollection}/>)

    return (
      <div style={this.style} className='user-list'>
        <h3>Here's your collection:</h3>
        {show}
      </div>
    )
  }
}
