import {
    actionCreator
} from "../profileReducer";
import {BaseThunkType, InferActionsTypes} from "../storeRedux";
import {stopSubmit} from "redux-form";


export type PostType = {
    id: number,
    message: string,
    likeCounts: string
}

export type ContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string,
}

export type PhotosType = {
    small: string,
    large: string
}

export type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType,
    aboutMe: string,
    photos: PhotosType | null,
}

export type PostDataType = {
    newPost: string,
    id: number
}

export type ProfileActionsTypes = InferActionsTypes<typeof actionCreator>


export type ThunkType = BaseThunkType<ProfileActionsTypes | ReturnType<typeof stopSubmit>>

/*export type AddPostActionType = {
    type: typeof ADD_POST,
    postData: PostDataType
}

export type DeletePostActionType = {
    type: typeof DELETE_POST,
    id: number
}

export type SetUserProfileActionType ={
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}

export type SetStatusActionType ={
    type: typeof SET_STATUS,
    status: string
}

export type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}*/

/*
export type ProfileActionsTypes = SavePhotoSuccessActionType
    | SetStatusActionType
    | SetUserProfileActionType
    | DeletePostActionType
    | AddPostActionType
*/


/*type ErrorType = {
    _error: string
}*/




