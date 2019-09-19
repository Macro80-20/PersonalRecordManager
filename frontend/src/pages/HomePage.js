import React from 'react'
import logo from '../logo.svg'
import { Link } from 'react-router-dom'

const HomePage = props =>
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

export default HomePage
 