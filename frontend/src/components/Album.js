import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'


const src = '/images/wireframe/white-image.png'

const Album= (props) => {
  const { album, onClick } = props 
  return (
  <Card onClick={() => onClick(album.id)} color='teal'>
    <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
    <Card.Content>
      <Card.Header>{album.name}</Card.Header>
      <Card.Meta>Downloads:{album.downloads}</Card.Meta>
      <Card.Meta>{album.year}</Card.Meta>
      <Card.Description>
       Artist:  {album.artist}
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

export default Album