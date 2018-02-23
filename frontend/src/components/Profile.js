import React from 'react'

import PropTypes from 'prop-types'
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import { connect } from 'react-redux'
import { uploadProfilePic } from '../utils/MotigramAPI'

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'
import ListItem from 'material-ui/List/ListItem'
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog'
import ImageInput from './ImageInput'

import serializeForm from 'form-serialize';
import { getUserInfo } from '../utils/MotigramAPI'

import { updateUserPic, updatePostsProfilePics } from '../actions'


class Profile extends React.Component {
    
    static propTypes = {
        isConnectedUser: PropTypes.bool.isRequired,
        handleCloseProfileModal: PropTypes.func.isRequired
    }



    state = {
        username: null,
        email: null,
        joinedDate: null,
        profilePic: null
    }


    handleUploadSubmit = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true });
        console.log("submitted", values)
        if (values.img) {
            values.userId = this.props.currentUser.id
            uploadProfilePic(values, this.props.currentUser.token).then(data => {
                this.props.updateUserPic(values.img)
                this.props.updatePicsInPosts({ img: values.img, userId: values.userId})
            })
        }
            
    }
    
    renderCurrentUser = () => {
     
        let defaultImage = require("../assets/default_person_image.png")
        if (this.props.currentUser.profilePic)
            defaultImage = this.props.currentUser.profilePic
        return (
            <div>

            <ListItem
                disabled={true}
                leftAvatar={
                    <Avatar size={64} src={defaultImage} />
                }
            >
                <h3 style={{"marginLeft": "10%"}}>{this.props.currentUser.username}</h3>
            </ListItem>

            <form  onSubmit={this.handleUploadSubmit} className="upload-image-form">
                <ImageInput
                    className="update-image-input"
                    name="img"
                     />

                    <br />
                    <FlatButton type="submit" label="Upload Picture" primary={true} />
            </form>
            <h4>EMAIL:</h4><p> {this.props.currentUser.email}</p>
            <h4>JOINED:</h4><p> {this.props.currentUser.joinedDate}</p>
            </div>
        )

    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.isConnectedUser && this.props.profileUserId !== prevProps.profileUserId)
            this.fetchUserAndSetState()
    }

    fetchUserAndSetState = () => {

        if (!this.props.currentUser) return null
        getUserInfo(this.props.profileUserId, this.props.currentUser.token).then(data => {
            this.setState({username: data.username, joinedDate: data.joinedDate, email: data.email, profilePic: data.profilePic})
        })
    }


    renderAnyUser = () => {

        let defaultImage = require("../assets/default_person_image.png")
        if (this.state.profilePic && this.state.profilePic !== null)
            defaultImage = this.state.profilePic
        return (
            <div>
            <ListItem
                disabled={true}
                leftAvatar={
                    <Avatar size={64} src={defaultImage} />
                }
            >
                <h3 style={{"marginLeft": "10%"}}>{this.state.username}</h3>
            </ListItem>

            <h4>EMAIL:</h4><p> {this.state.email}</p>
            <h4>JOINED:</h4><p> {this.state.joinedDate}</p>
            </div>
        )

    }

    render() {

        
         const actions = [
              <FlatButton
                label="Close"
                primary={true}
                onClick={this.props.handleCloseProfileModal}
              />,
         ];
        
        return (

            <Dialog
                title="Profile Preview"
                actions={actions}
                open={this.props.isProfileModelOpen || false}
                onRequestClose={this.props.handleCloseProfileModal}
            >

            {this.props.isConnectedUser && 
                this.renderCurrentUser()
            }

            {!this.props.isConnectedUser &&
                this.renderAnyUser()
            }

            </Dialog>
        )
    }


}

function mapStateToProps ({ connectedUser }) {
    return {
        currentUser: connectedUser
    }
}

function mapDispatchToProps (dispatch) {
    return {
        updateUserPic: (img) => dispatch(updateUserPic(img)),
        updatePicsInPosts: (data) => dispatch(updatePostsProfilePics(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
