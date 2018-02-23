import React from 'react'

import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import FlatButton from 'material-ui/FlatButton';
import PostCard from './PostCard'

import TextField from 'material-ui/TextField'

import Dialog from 'material-ui/Dialog'
import ImageInput from './ImageInput'

import serializeForm from 'form-serialize';
import { uploadImagePost, fetchImagesPost } from '../utils/MotigramAPI' 

import { connect } from 'react-redux'
import { addPosts, addOnePost } from '../actions'

import Profile from './Profile'

class FeedPage extends React.Component {
    
    state = {
        uploadModelIsOpen: false,
        profileModelIsOpen: false,
        isConnectedUser: false,
        profileUserId: null,
    }

    handleCloseUploadModal = () => this.setState({ uploadModelIsOpen: false })
    handleOpenUploadModal = () => this.setState({ uploadModelIsOpen: true })


    handleSubmit = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true });
        if (values.img)
            values.userId = this.props.currentUserId
            uploadImagePost(values, this.props.token).then(data => {
                data.username = this.props.currentUsername
                data.profilePic = this.props.currentUserProfilePic
                console.log(data)

                this.props.addUploadedImage(data)
                this.handleCloseUploadModal()
            })
    }
    
    componentDidMount() {
        fetchImagesPost(this.props.token).then(data => {
            this.props.setInitialPosts(data)
            console.log(data)
        })
    }
    
    
    handleCloseProfileModal = () => this.setState({isProfileModelOpen: false})
    handleOpenProfileModal = () => this.setState({isProfileModelOpen: true })

    openModelForLoggedUser = () => {
        this.setState({isConnectedUser: true})
        this.handleOpenProfileModal()
    }

    openModelForAnyUser = (userId) => {
        if (userId === this.props.currentUserId)
            this.openModelForLoggedUser()
        else {
            this.setState({isConnectedUser: false, profileUserId: userId})
            this.handleOpenProfileModal()
        }
    }
    render() {

         const actions = [
              <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleCloseUploadModal}
              /> ];

        return (
            <div>
            <Toolbar className="sticky-toolbar" >
                <ToolbarGroup>
                    <FlatButton label={this.props.currentUsername || "User"} onClick={() => { this.openModelForLoggedUser() }}  />
                </ToolbarGroup>
                <ToolbarGroup style={{"marginLeft": "auto"}}>
                    <ToolbarSeparator />
                    <RaisedButton label="Upload" primary={true} onClick={this.handleOpenUploadModal} />
                <IconMenu
                    iconButtonElement={
                      <IconButton touch={true}>
                        <NavigationExpandMoreIcon />
                      </IconButton>
                    }
                  >
                    <MenuItem primaryText="Logout" onClick={() => {this.props.history.push('/logout')}}/>
                  </IconMenu>
                </ToolbarGroup>
            </Toolbar>
                <Dialog
                    title="Upload Image"
                    actions={actions}
                    open={this.state.uploadModelIsOpen || false}
                    onRequestClose={this.handleCloseUploadModal}
                >
                <form  onSubmit={this.handleSubmit} className="upload-image-form">
                    <ImageInput
                        className="upload-image-input"
                        name="img"
                         />

                        <TextField 
                            hintText="Caption"
                            name="caption" />
                        <br />
                        <FlatButton type="submit" label="Upload Post" secondary={true} />
                </form>
                </Dialog>

                <Profile 
                    isConnectedUser={this.state.isConnectedUser} 
                    profileUserId={this.state.profileUserId} 
                    isProfileModelOpen={this.state.isProfileModelOpen} 
                    handleCloseProfileModal={this.handleCloseProfileModal} 
                />
                    

                <div className="feed-page">
                     {this.props.imagePosts && this.props.imagePosts.error === undefined && this.props.imagePosts.map(post => {
                       return (
                           <PostCard 
                                key={post._id} 
                                postProperties={post} 
                                handleProfileModel={this.openModelForAnyUser.bind(this)}/> 
                        )
                    })}
                </div>
            </div>
        )
    }
}

function mapStateToProps ({ connectedUser, imagePosts  }) {
    return {
        currentUserId: connectedUser.id,
        currentUsername: connectedUser.username,
        currentUserProfilePic: connectedUser.profilePic,
        token: connectedUser.token,
        imagePosts: imagePosts.posts
    }
}

function mapDispatchToProps (dispatch) {
    return {
        setInitialPosts: (posts) => dispatch(addPosts(posts)),
        addUploadedImage: (post) => dispatch(addOnePost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage)
