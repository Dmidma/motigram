import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import logo from '../assets/motius_logo.jpg';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import cookie from 'react-cookies'

import { createUser, loginUser } from '../utils/MotigramAPI'
import { connect } from 'react-redux'
import { addUser } from '../actions'

class CredentialsBox extends React.Component {
    
    static propTypes = {
        type: PropTypes.string.isRequired,
    }
    
    state = {
        username: '',
        password: '',
        email: '',
        isSnackOpen: false,
        snackText: ''
    }

    handleUsernameInput = (e) => {
        this.setState({username: e.target.value})
    }

    handlePasswordInput = (e) => {
        this.setState({password: e.target.value})
    }

    handleEmailInput = (e) => {
        this.setState({email: e.target.value})
    }
    setLoginTexts() {
        this.setState({
            buttonText: "Login",
            redirectText: "Still no account?",
            redirectUrl: "/signup"
        })
    }

    setSingupTexts() {
        this.setState({
            buttonText: "Signup",
            redirectText: "Have an account?",
            redirectUrl: "/login"
        })
    }
    componentWillMount() {
        this.handleType(this.props.type)
    }
    handleType(type) {
        switch(type) {
            case "login":
                this.setLoginTexts()
            break;
            case "signup":
                this.setSingupTexts()
            break;
            default:
        }
    }
    
    componentWillReceiveProps(nextProps) {
       this.handleType(nextProps.type)
    }

    handleSnackClose = () => {
        this.setState({isSnackOpen: false})
    }

    handleLeButton() {
        const { username, email, password} = this.state;
        switch (this.props.type) {
            case 'login':
                loginUser(username, password).then(data => {
                    if (data.error) {
                        this.setState({isSnackOpen: true, snackText: `User already connected elsewhere`})
                    } else {
                        this.setState({isSnackOpen: true, snackText: `Welcome back ${data.username}`})
                        cookie.save("connectedUser", data.id)
                        this.props.connectUser(data)
                        this.redirect('/feed')
                    }
                })
            break;
            case 'signup':

            createUser(username, email, password).then(data => {
                this.setState({isSnackOpen: true, snackText: `User has been created`})
                this.redirect("/login")
            })

            break;
            default:
        }
    }

    redirect = (url) => {
        setInterval(() => {
            this.props.history.push(url)
        }, 3000)
    }


    render() {
        return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Motigram</h1>
        </header>
            <div className="login">
              <TextField hintText="Username" onChange={this.handleUsernameInput} />
              {this.props.type === "signup" &&
                  <TextField hintText="Email" onChange={this.handleEmailInput} />
              }
              <TextField hintText="Password" type="password" onChange={this.handlePasswordInput}/>
              <br />
              <Link to={this.state.redirectUrl} className="switch">{this.state.redirectText}</Link>
              <br />
              <RaisedButton label={this.state.buttonText} primary={true} onClick={this.handleLeButton.bind(this)}  />

              <Snackbar 
                open={this.state.isSnackOpen}
                message={this.state.snackText}
                autoHideDuration={3000} 
                onRequestClose={this.handleSnackClose} /> 
            </div>
            </div>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        connectUser: (data) => dispatch(addUser(data))
    }
}

export default connect(null, mapDispatchToProps)(CredentialsBox)
