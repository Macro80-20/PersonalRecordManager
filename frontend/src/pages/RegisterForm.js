import React, { Component,  Fragment } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'

const lowerCaseRegex = /[a-z]/ 
const upperCaseRegex = /[A-Z]/
const numberRegex  = /[0-9]/

export default class RegisterForm extends Component {
  state = {
    name: "",
    role: "",
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
  handleSubmit = evt => {
    if (this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    const {name ,role,  email, password } = this.state;
    alert(`Signed up with email: ${email} password: ${password}`);
    this.setState({ submittedName: name, submittedrole: role, submittedPassword: password, submittedEmail: email, submittedForm:true })
    // this.props.nextPage(name,role,email,password) 
   // sort ab
    evt.preventDefault();
  };




  render(){
    const { name, role, email, password } = this.state
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
      <div>
  <Form onSubmit={handleSubmit}>
      <Form.Input
        name = "name" 
        error={shouldMarkError("name") && { content: 'Please tell us your first name - this will help us send offers and news to the right person', pointing: 'below' }}
        fluid
        label='Name'
        placeholder='Name'
        onChange={handleChange}
        onBlur={this.handleBlur('name')}
        required
      />
      <Form.Input
        name="role"
        fluid
        label='Role'
        placeholder='Role'
        onChange={handleChange}
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
 
    </div>
    )
  }
}
