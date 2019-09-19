import React, { Component } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import HomePage from './pages/HomePage'
import Header from './pages/Header'
import SignInForm from './pages/SignInForm'
import Collection from './pages/Collection'

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
        <Header username={email} signout={signout} />
        <Switch>
          <Route  exact path='/' render={props => (<HomePage {...props}/>)}/>
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

// <div className="App">    
//        <Switch>
//         {//if a user is not logged in when he clicks on / he is redirected to landing page
//          // if the user is logged in he can never go landing page.
//         }
//         <Route exact path="/" render={ props => (
//           localStorage.token?
//           <HomePage {...props} signnout= {signout} cars={this.state.cars} selectedCar={selectedCar} handleClickedCar={this.handleClickedCar}
//               />:
//           <Redirect to="/landing-page"/>
//         )}/>
//         <Route exact path="/landing-page" render={ props => (
//           localStorage.token
//           ?<Redirect to="/"/>
//           : <LandingPage  email = {this.state.email} signin={signin}{...props}/>
      
//         )}/>


//           <Route
//             path='/landing-page'
//             render={props => (
//               <LandingPage  email = {this.state.email} signin={signin}{...props}/>
//             )}
//             exact
//           />
//           <Route
//             path='/profile'
//             render={props => (
//               localStorage.token
//                 ?  <ProfilePage {...props} email={this.state.email} /> 
//                 :  <Redirect to="/cars"/>
//                 )}
//             exact
//           />
//           <Route
//             path='/cars'
//             render={props => (
//               <HomePage signin={signin} {...props} signout={signout} cars={this.state.cars} selectedCar={selectedCar} handleClickedCar={this.handleClickedCar}
//               />
//             )}
//             exact
//           />
//           <Route
//             path='/car'
//             render={props => (
//               <CarSpecs {...props} car={selectedCar} />
//             )}
//             exact
//           />
         
//         </Switch> 
       
//       </div>