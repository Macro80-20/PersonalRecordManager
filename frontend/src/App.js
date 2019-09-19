import React, { Component } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import HomePage from './pages/HomePage'
import NavBar from './pages/NavBar'
import SignInForm from './pages/SignInForm'
import Collection from './pages/Collection'
import RegisterForm from './pages/RegisterForm'
import { validate } from './services/api'

import './App.css'

class App extends Component {

  state = {
    email: '',
    // albumCollection: [],
    // selectedCar: {},
  }

  signin = (user) => {
    this.setState({ email: user.email })
    localStorage.setItem('token', user.token)
    this.props.history.push('/collection')
  }

  signout = () => {
    this.setState({ email: '' })
    localStorage.removeItem('token')
    this.props.history.push('/')
  }

  componentDidMount () {
    if (localStorage.token) {
      validate()
        .then(data => {
          if (data.error) {
            alert(data.error)
          } else {
            this.signin(data)
          }
        })
    }
  }

  render() {
    const { signin, signout } = this
    const { email } = this.state
    return (
      <div className="App">
        <NavBar email={email} signin={signin} signout={signout} />
        {/* {email && <RegisterForm signin={signin}/>} */}

        <Switch>
          <Route  exact path='/' render={props => (<HomePage email={email} signin={signin} {...props}/>)}/>
          <Route path='/signin'  render={props => (
          !this.state.email
          ?(<SignInForm signin={signin} {...props} />)
          :<Redirect to="/collection"/>
          )}/>
          <Route path='/collection'  render={props => <Collection email={email} {...props} />} />
          <Route component={() => <h1>Page not found.</h1>} />
        </Switch>

      </div>
    )
  }
}

export default withRouter(App)
