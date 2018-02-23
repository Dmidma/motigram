import { combineReducers } from 'redux'


import { connectedUser } from './ConnectedUser'
import { imagePosts } from './ImagePosts'


export default combineReducers({
    connectedUser,
    imagePosts
})
