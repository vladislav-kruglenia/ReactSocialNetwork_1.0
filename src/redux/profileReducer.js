import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = "PROFILE_ADD_POST"
//const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT"
const SET_USER_PROFILE = "PROFILE_SET_USER_PROFILE"
const SET_STATUS = "PROFILE_SET_STATUS"
const DELETE_POST = "PROFILE_DELETE_POST"


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
        case DELETE_POST: {
            return {
                ...state,
                posts: [...state.posts.filter(p => p.id !== action.id)]
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
//actionCreators
export let actionCreator = {
    addPost(text) {
        return {
            type: ADD_POST,
            newPostText: text
        }
    },
    deletePost(id) {
        return {
            type: DELETE_POST,
            id
        }
    }
}

export let setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}

export let setStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    }
}
//actionCreators

//thunkCreators
export let getProfileInfoThunkCreator = (numberID) => {
    return async (dispatch) => {
        let response = await usersAPI.getProfile(numberID)
        dispatch(setUserProfile(response))
    }
}

export let getStatusThunkCreator = (numberID) => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(numberID)
        dispatch(setStatus(response.data))
    }
}

export let updateStatusThunkCreator = (status) => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }
}


export default profileReducer
