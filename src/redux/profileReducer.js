import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = "ADD_POST"
//const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"

let startState = {
    posts: [{id: 1, message: "This my first post", likeCounts: '26'}],
    profile: null,
    newPostText: "",
    status: ""
}

let profileReducer = (state = startState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 4,
                message: action.newPostText,
                likeCounts: 28
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            }
        }
        case SET_USER_PROFILE: {

            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }

        default:
            return state
    }
}

export let actionCreator = {
    addPost(text) {
        return {
            type: ADD_POST,
            newPostText:text
        }
    }
}
export let setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}

export let setStatus = (status) =>{
    return {
        type: SET_STATUS,
        status
    }
}

export let getProfileInfoThunkCreator = (numberID) =>{
    return (dispatch) =>{
        usersAPI.getProfile(numberID)
            .then(response => {
                dispatch(setUserProfile(response))
            })
    }
}

export let getStatusThunkCreator = (numberID) =>{
    return (dispatch) =>{
        profileAPI.getStatus(numberID)
            .then(response => {
                dispatch(setStatus(response.data))
            })
    }
}

export let updateStatusThunkCreator = (status) =>{
    return (dispatch) =>{
        profileAPI.updateStatus(status)
            .then(response => {
                if(response.data.resultCode === 0){
                    dispatch(setStatus(status))
                }
            })
    }
}

export default profileReducer
