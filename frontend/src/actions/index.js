export const ADD_USER = 'ADD_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const UPDATE_PIC = 'UPDATE_PROFILE_PIC'


export function addUser({ id, username, email, token, profilePic, joinedDate  }) {
    return {
        type: ADD_USER,
        id,
        username,
        email,
        token,
        profilePic,
        joinedDate
    }
}

export function removeUser() {
    return {
        type: REMOVE_USER
    }
}


export function updateUserPic(img) {
    return {
        type: UPDATE_PIC,
        img
    }
}

export const ADD_POSTS = 'ADD_POSTS'
export const ADD_ONE_POST = 'ADD_ONE_POST'
export const UPDATE_PROFILE_PICS = 'UPDATE_PROFILE_PICS'

export function addPosts( posts ) {
    return {
        type: ADD_POSTS,
        posts
    }
}

export function addOnePost( post ) {
    return {
        type: ADD_ONE_POST,
        post
    }
}

export function updatePostsProfilePics( { img, userId }) {
    return {
        type: UPDATE_PROFILE_PICS,
        img,
        userId
    }
}
