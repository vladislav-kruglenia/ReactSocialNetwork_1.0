import {stopSubmit} from "redux-form";
import {
    PhotosType,
    PostDataType,
    PostType, ProfileActionsTypes,
    ProfileType
} from "./Types/ProfileReducerTypes";
import {ThunkType} from "./Types/ProfileReducerTypes";
import {profileAPI} from "../api/profile-api";

export const ADD_POST = "PROFILE_ADD_POST";
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

let profileReducer = (state:StartStateProfileType = startState, action: ProfileActionsTypes): StartStateProfileType => {
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
    addPost(postData: PostDataType) {
        return {
            type: ADD_POST,
            postData
        } as const
    },
    deletePost(id: number) {
        return {
            type: DELETE_POST,
            id
        } as const
    },
    setUserProfile: (profile: ProfileType) => {
        return {
            type: SET_USER_PROFILE,
            profile
        } as const
    },

    setStatus: (status: string) => {
        return {
            type: SET_STATUS,
            status
        } as const
    },
    savePhotoSuccess: (photos: PhotosType) => {
        return {
            type: SAVE_PHOTO_SUCCESS,
            photos
        } as const
    },
};

//actionCreators

//thunkCreators

export let getProfileInfoThunkCreator = (numberID: number | null): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.getProfile(numberID);
        dispatch(actionCreator.setUserProfile(response))
    }
};

export let getStatusThunkCreator = (numberID: number): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(numberID);
        dispatch(actionCreator.setStatus(response))
    }
};

export let updateStatusThunkCreator = (status: string): ThunkType => {
    return async (dispatch) => {
        try {
            let response = await profileAPI.updateStatus(status);
            if (response.resultCode === 0) {
                dispatch(actionCreator.setStatus(status))
            }
        } catch {
            //
        }
    }
};

export let savePhotoThunkCreator = (file: File): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.savePhoto(file);
        if (response.resultCode === 0) {
            dispatch(actionCreator.savePhotoSuccess(response.data.photos))
        }
    }
};

export let saveProfileDataThunkCreator = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    let userId = getState().auth.id;
    let response = await profileAPI.saveProfileData(profile);
    if (response.resultCode === 0) {
        await dispatch(getProfileInfoThunkCreator(userId))
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.messages[0]}));
        return Promise.reject(response.messages[0])
    }
};

//thunkCreators


export default profileReducer
