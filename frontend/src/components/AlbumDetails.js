import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'


const src = '/images/wireframe/white-image.png'

const AlbumDetails= (props) => {
  const { album , returnToCollection } = props 
  console.log(props)
  return (
  <Card  color='teal'>
    <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
    <Card.Content>
      <Card.Header>{album.name}</Card.Header>
      <Card.Meta>No of downloads:{album.downloads}</Card.Meta>
      <Card.Meta>Released:{album.year}</Card.Meta>
      <Card.Description>
        Artist: {album.artist}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='music' />
        {album.numberOfSongs} SONGS
      </a>
      <ol>
      <li>Till I Collapse</li>
      <li> More rain</li>
      <li> Send </li>
      <li> More alive</li>
      <li> Beat it </li>
      <li> Run </li>
      </ol>
    </Card.Content>
    <button onClick={() => returnToCollection()}> Go back </button>
  </Card>
)
}

export default AlbumDetails