import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = "PROFILE_ADD_POST"
//const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT"
const SET_USER_PROFILE = "PROFILE_SET_USER_PROFILE"
const SET_STATUS = "PROFILE_SET_STATUS"
const DELETE_POST = "PROFILE_DELETE_POST"
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS"


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
                id: action.postData.id,
                message: action.postData.newPost,
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
        case SAVE_PHOTO_SUCCESS: {
            debugger
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
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
    addPost(postData) {
        return {
            type: ADD_POST,
            postData
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
export let savePhotoSuccess = (photos) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos
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
        try {let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }}
        catch{
            //
        }
    }
}

export let savePhotoThunkCreator = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}
export let saveProfileDataThunkCreator = (profile) => async (dispatch, getState) => {
    let userId = getState().auth.id
    let response = await profileAPI.saveProfileData(profile)
    if (response.data.resultCode === 0) {
        dispatch(getProfileInfoThunkCreator(userId))
    } else{
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]} ))
        return Promise.reject(response.data.messages[0])
    }
}

//thunkCreators


export default profileReducer
