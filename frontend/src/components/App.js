import React, { Component } from 'react';
import { Route, Switch,  withRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
import { removeUser } from '../actions'
import '../App.css';


import CredentialsBox from './CredentialsBox'
import FeedPage from './FeedPage'
import Page404 from './Page404'

import { logoffUser } from '../utils/MotigramAPI'


const setConnectedUserCookie = (id) => cookie.save("connectedUser", id)

const removeConnecteUserCookie = () => cookie.remove("connectedUser")

const getConnectedUserCookie = () => cookie.load("connectedUser")



class App extends Component {
    
    renderCredentials = (url, type) => {
        
        return (
            <Route exact path={url} render={({ history }) => { 
                

                const connectedUserId = getConnectedUserCookie()
                if (connectedUserId !== undefined || this.props.currentUserId !== null) {
                    // TODO: Check if the ID of the user has a token
                    history.push("/feed")
                }
                return <CredentialsBox history={history} type={type} /> } 
            } />
        )
    }

  render() {
    return (
        <MuiThemeProvider>
        <Switch>
            {this.renderCredentials("/login", "login")}
            {this.renderCredentials("/", "login")}
            {this.renderCredentials("/signup", "signup")}
            <Route exact path="/logout" render={({ history }) => {
                    
                    console.log("Logging Out")
                    
                    const connectedUserId = getConnectedUserCookie();
                    if (connectedUserId === undefined || this.props.currentUserId === null) return null
                    logoffUser(connectedUserId, this.props.token).then(data => {
                        // TODO: Change this call to somewhere else, this is causing a refresh of the main page
                        this.props.removeUserFromStore()
                        removeConnecteUserCookie()
                    })

                    history.push('/') 
                    return null 
                }
            } />

           <Route exact path="/feed" render={({ history }) => {
                // make sure now user is connected
                if (getConnectedUserCookie() === undefined || this.props.currentUserId === null) {
                    removeConnecteUserCookie()
                    this.props.removeUserFromStore()
                    history.push("/")
                }
                return <FeedPage history={history} />
           } 
            }/>
           <Route component={Page404} />
        </Switch>
        </MuiThemeProvider>
    );
  }
}

function mapStateToProps ({ connectedUser }) {
    let currentId = null
    if (connectedUser && connectedUser.id)
        currentId = connectedUser.id
    return {
        currentUserId: currentId,
        token: connectedUser.token
    }
}

function mapDispatchToProps (dispatch) {
    return {
        removeUserFromStore: () => dispatch(removeUser())
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
