import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

import Album from '../components/Album'
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

  onClick = (albumId) => {
    const { albumCollection } = this.state 
    let selectedAlbum = albumCollection.find(album => album["id"] === albumId);
    this.setState({selectedAlbum: selectedAlbum});
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
    const { albumCollection } = this.state
    const { onClick } = this
    return (
      <div style={this.style} className='user-list'>
        <h3>Here's your collection:</h3>
        <Card.Group >
        { albumCollection.length === 0 && <p>Sorry, you don't have any items.</p>}
        {
          albumCollection.map(album =>
            <Album key={album.id} album={album} onClick = {() => onClick(album["id"])}/>
          )
        }
        
        </Card.Group>
      </div>
    )
  }
}


