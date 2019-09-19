import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import HomePage from './pages/HomePage'
import Header from './pages/Header'
import SignInForm from './pages/SignInForm'
import Collection from './pages/Collection'

import { validate } from './services/api'

import './App.css'

class App extends Component {

  state = {
    name: '',
  }

  signin = (user) => {
    this.setState({ name: user.uname })
    localStorage.setItem('token', user.token)
    this.props.history.push('/inventory')
  }

  signout = () => {
    this.setState({ name: '' })
    localStorage.removeItem('token')
  }

  componentDidMount () {
    // if (localStorage.token) {
    //   validate()
    //     .then(data => {
    //       if (data.error) {
    //         alert(data.error)
    //       } else {
    //         this.signin(data)
    //       }
    //     })
    // }
  }

  render() {
    const { signin, signout } = this
    const { username } = this.state
    return (
      <div className="App">
        <Header username={username} signout={signout} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/signin' component={props => <SignInForm signin={signin} {...props} />} />
          <Route path='/inventory' component={props => <Collection username={username} {...props} />} />
          <Route component={() => <h1>Page not found.</h1>} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)