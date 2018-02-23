import {
    ADD_USER,
    REMOVE_USER,
    UPDATE_PIC
} from '../actions'


export const connectedUser = (state = {}, action) => {
   switch (action.type) {
        case ADD_USER:
           const {id, username, email, token, joinedDate, profilePic } = action
           return {
               id,
               username,
               email,
               token,
               joinedDate,
               profilePic
           }
        case REMOVE_USER:
            return {}
       case UPDATE_PIC:
           const { img } = action
           return {
               ...state,
               profilePic: img
            }
        default:
           return state
   }
}
