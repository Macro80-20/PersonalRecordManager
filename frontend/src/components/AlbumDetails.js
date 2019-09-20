import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'


const src = '/images/wireframe/white-image.png'

const albumDetails= (props) => {
  const { album } = props 
  return (
  <Card color='teal'>
    <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
    <Card.Content>
      <Card.Header>{album.name}</Card.Header>
      <Card.Meta>{album.downloads}</Card.Meta>
      <Card.Meta>{album.year}</Card.Meta>
      <Card.Description>
        {album.artist}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        {album.numberOfSongs} SONGS
      </a>
    </Card.Content>
  </Card>
)
}

export default albumDetails