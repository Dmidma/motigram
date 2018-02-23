import {
    ADD_POSTS,
    ADD_ONE_POST,
    UPDATE_PROFILE_PICS
} from '../actions'

export const imagePosts = (state = [], action) => {

    switch (action.type) {
        case ADD_POSTS:
            const { posts } = action
            
            return { posts }
        case ADD_ONE_POST:
        const { post } = action
        
            state.posts.unshift(post)
            return state

        case UPDATE_PROFILE_PICS:
            const { img, userId } = action
            const updatedPosts = state.posts.map(post => {
                if (post.userId === userId)
                    post.profilePic = img

                return post
            })
            
            return {
                posts: updatedPosts
            }

        default:
            return state
    }
}
