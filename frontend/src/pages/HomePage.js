import React from 'react'

import logo from '../logo.svg'
import { Link } from 'react-router-dom'
import RegisterForm from './RegisterForm'
const HomePage = props =>
  <header className='App-header'>
    <Link to='/'><img src={logo} className='App-logo' alt='logo' /></Link>
    <h1 className='App-title'>
    {
    props.email
    ? `Welcome back, ${props.email}!`
    : 'Welcome to your new music collection dashboard.'
    }
    {
    !props.email &&
    <RegisterForm signin={props.signin}/>
    }
    </h1>
  </header>

export default HomePage
 