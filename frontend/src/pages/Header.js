import React from 'react'

import { Link } from 'react-router-dom'
// import Button from '@material-ui/core/Button'



const Header = props =>

   <div>
    <h1>Home page!</h1>
    <Link to='/signin'>Signin</Link> | <Link to='/collection'>collection</Link>
  </div>
export default Header
