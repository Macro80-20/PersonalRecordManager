import { Link } from 'react-router-dom'
import React, { Component, Fragment } from 'react'
import {  Button, Form, Segment } from 'semantic-ui-react'
import { login } from '../services/api'


export default class SignInForm extends Component {
    state = { 
      email: '', 
      password: '', 
      }
  
    handleChange = (event) => this.setState({ [event.target.name]: event.target.value });
  
    handleSubmit = () => {
      //making our get request to the server sending these details, in that route we authenticate and issue a token 
      login(this.state.email, this.state.password)
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          //if we pass authentication in this route , then we invoke our signIn method
          this.props.signin(data)
        //   this.props.loginClick()
        }
      })
      // const { name, email } = this.state
      // this.setState({ submittedName: name, submittedEmail: email })
    }
  
    render(){
      const { email, password  } = this.state
    return(
    <>
        <Form onSubmit={this.handleSubmit} size='large'>
            <Form.Input 
            fluid icon='user' 
            iconPosition='left' 
            placeholder='E-mail address'
            name="email"
            value= {email}
            onChange={this.handleChange}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name="password"
              value= {password}
            onChange={this.handleChange}
            />
  
            <Button color='teal' fluid size='large' className="ui button">
              Login
              </Button>

        </Form>
        </>
  )
}
};
