import React, { Component,  Fragment } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { Form, Input, Button } from 'semantic-ui-react'


import { signup , login  } from '../services/api'

const lowerCaseRegex = /[a-z]/ 
const upperCaseRegex = /[A-Z]/
const numberRegex  = /[0-9]/

class RegisterForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    touched: {        
        email: false, 
        password: false
    },
 }

 handleChange = (event) => this.setState({ [event.target.name]: event.target.value });

 validateForm = (name,password,email) => {
    // true means invalid, so our conditions got reversed
    return {
      name: name.length ===0,
      email: email.length === 0 ,
      password:  this.passwordValidator(password)
     
    };
  }

  passwordValidator = (password) => {
    const passWordMeetsStandards = password.length === 0 || !lowerCaseRegex.test(password) || !upperCaseRegex.test(password) || !numberRegex.test(password) || password.length < 9
    return passWordMeetsStandards
  }

 handleBlur = field => evt => {
//This ensures that the first time a user focuses on the field, the error won’t appear right away. 
//Instead, it will only pop up when the field is blurred. On subsequent focuses, though, the error would appear.
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  canBeSubmitted =() => {
    const errors = this.validateForm(this.state.name, this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }


  handleSubmit = (evt) => {
    if (this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    } 
    signup(this.state).then(data => login(this.state.email , this.state.password))
    .then( userInfo => {

      // difference beween login and signin. is that login is api request which returns the users email and token.
      // signin is then invoked to manage state for session. with an email 
      this.props.signin(userInfo)
      this.props.history.push('/collection')
    })

  }
  render(){
    const { name, email, password } = this.state
    const {handleSubmit, handleChange, validateForm} = this
   
    const errors = validateForm(name, password, email );
    // the submit button is deactivated. when the person fills out the form as soon as there are characters in each form submit button activates
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = field => {
        const hasError = errors[field];
        const shouldShow = this.state.touched[field]
        return hasError ? shouldShow : false;
      };


    return(
      <>
  <Form onSubmit={handleSubmit}>
      <Form.Input
        name = "name" 
        error={shouldMarkError("name") && { content: 'Please tell us your name - this will help us send offers and news to the right person', pointing: 'below' }}
        fluid
        label='Name'
        placeholder='Name'
        onChange={handleChange}
        onBlur={this.handleBlur('name')}
        required
      />
      <Form.Input
        name="password"
        error={shouldMarkError("password") && 'Your password needs to include a minimum of 9 characters, a number, a lowercase letter an an uppercase letter'}
        fluid
        label='Password'
        placeholder='password'
        onChange={handleChange}
        onBlur={this.handleBlur('password')}
        type="password"
        required
      />
      <Form.Input
        name="email"
        error={shouldMarkError("email") && 'Please enter your email to continue'}
        fluid
        label='Email'
        placeholder='Email'
        onChange={handleChange}
        onBlur={this.handleBlur('email')}
        type="email"
        required
      />
      <Button disabled={isDisabled} type='submit'>Submit</Button>
  </Form>
 
    </>
    )
  }
}

export default withRouter(RegisterForm)