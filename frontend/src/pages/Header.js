import React from 'react'

import { Link } from 'react-router-dom'
// import Button from '@material-ui/core/Button'

import logo from '../logo.svg'

const Header = props =>
  <header className='App-header'>
    <Link to='/'><img src={logo} className='App-logo' alt='logo' /></Link>
    <h1 className='App-title'>
      {
        props.username
          ? `Welcome back, ${props.username}!`
          : 'Welcome my Sons.'
      }
      {
        props.username &&
          <button onClick={props.signout} variant='contained' color='primary'>
            SIGN OUT
          </button>
      }
    </h1>
  </header>

export default Header
