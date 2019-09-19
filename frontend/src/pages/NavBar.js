import React, { Component } from 'react'
import { Menu, Button, Modal } from 'semantic-ui-react'
import {  withRouter , Link} from 'react-router-dom'
import SignInForm from './SignInForm';
class NavBar extends Component {
  state = {
    text: "",
    // isLoggedIn: false
  }

  handleNavClick = (e, { name }) => {
    this.props.history.push(`/${name.toLowerCase()}`)
    this.setState({ activeItem: name })
  }

  handlelogOutClick = e => {
    this.props.signout();
    this.setState({isLoggedIn: !this.state.isLoggedIn});
  }

  handleLogInClick = data => {
    this.setState({isLoggedIn: !this.state.isLoggedIn})
}


  
  render() {
    const { activeItem, isLoggedIn } = this.state
    let button;
      if (this.props.email) {
        button = <Button onClick={this.handlelogOutClick}>Sign out</Button>;
      } else {
      button = 
       <Modal trigger={<Button>Log in</Button>}>
        <Modal.Content>
          <SignInForm loginClick={this.handleLogInClick} signin={this.props.signin}/>
        </Modal.Content>
      </Modal>
      
    }
    return (
      <Menu>
        <Menu.Item header>PersonAlbumDashboard</Menu.Item>
        {/* <Menu.Item
          name='Latest'
          active={activeItem === 'Latest'}
          onClick={this.handleItemClick}
        /> */}
        <Menu.Item 
        name='collection' 
        active={activeItem === 'collection'} 
        onClick={this.handleNavClick} />
        <Menu.Item>
          {button}
         </Menu.Item>
      </Menu>
    )
  }
}


// const Header = props =>

//    <div>
//     <h1>Home page!</h1>
//     <Link to='/signin'>Signin</Link> | <Link to='/collection'>collection</Link>
//   </div>
// export default Header

// {isLoggedIn
//   ? <Button>Sign out</Button>}
//   <Modal trigger={button}>
//     <Modal.Content>
//     <LoginForm/>
//   </Modal.Content>
//   </Modal>
export default withRouter(NavBar)