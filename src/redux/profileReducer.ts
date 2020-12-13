import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {
    AddPostType,
    DeletePostType, PhotosType,
    PostDataType,
    PostType,
    ProfileType, SavePhotoSuccessActionType, SetStatusActionType,
    SetUserProfileType
} from "./Types/ProfileReducerTypes";

export const ADD_POST = "PROFILE_ADD_POST";
//const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT"
export const SET_USER_PROFILE = "PROFILE_SET_USER_PROFILE";
export const SET_STATUS = "PROFILE_SET_STATUS";
export const DELETE_POST = "PROFILE_DELETE_POST";
export const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";


let startState = {
    posts: [{id: 1, message: "This my first post", likeCounts: '26'}] as Array<PostType>,
    profile: null as null | ProfileType,
    newPostText: "",
    status: ""
};
export type StartStateProfileType = typeof startState

let profileReducer = (state = startState, action:any): StartStateProfileType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: action.postData.id,
                message: action.postData.newPost,
                likeCounts: 28
            };
            return {
                ...state,
                posts: [...state.posts, newPost] as Array<PostType>,
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
                profile: {...state.profile, photos: action.photos} as ProfileType
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
};
//actionCreators
export let actionCreator = {
    addPost(postData:PostDataType):AddPostType {
        return {
            type: ADD_POST,
            postData
        }
    },
    deletePost(id:number):DeletePostType {
        return {
            type: DELETE_POST,
            id
        }
    }
};

export let setUserProfile = (profile:ProfileType):SetUserProfileType => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
};

export let setStatus = (status:string):SetStatusActionType => {
    return {
        type: SET_STATUS,
        status
    }
};
export let savePhotoSuccess = (photos:PhotosType):SavePhotoSuccessActionType => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos
    }
};

//actionCreators

//thunkCreators

export let getProfileInfoThunkCreator = (numberID:number) => {
    return async (dispatch:any) => {
        let response = await usersAPI.getProfile(numberID);
        dispatch(setUserProfile(response))
    }
};

export let getStatusThunkCreator = (numberID:number) => {
    return async (dispatch:any) => {
        let response = await profileAPI.getStatus(numberID);
        dispatch(setStatus(response.data))
    }
};

export let updateStatusThunkCreator = (status:string) => {
    return async (dispatch:any) => {
        try {
            let response = await profileAPI.updateStatus(status);
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        } catch {
            //
        }
    }
};

export let savePhotoThunkCreator = (file:any) => async (dispatch:any) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
};
export let saveProfileDataThunkCreator = (profile:ProfileType) => async (dispatch:any, getState:any) => {
    let userId = getState().auth.id;
    let response = await profileAPI.saveProfileData(profile);
    if (response.data.resultCode === 0) {
        dispatch(getProfileInfoThunkCreator(userId))
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0])
    }
};

//thunkCreators


export default profileReducer
