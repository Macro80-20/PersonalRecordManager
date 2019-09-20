
import React from 'react'
import { Card } from 'semantic-ui-react'

import Album from './Album'
const Albums = props =>{
    return(
    <Card.Group>
        { props.albumCollection.length === 0 && <p>Sorry, you don't have any items.</p>}
        {
        props.albumCollection.map(album =>
        <Album key={album.id} album={album} onClick ={props.onClick}/>
        )
        }
    </Card.Group>
        )
}

export default Albums 