import {ADD_POST, DELETE_POST, SAVE_PHOTO_SUCCESS, SET_STATUS, SET_USER_PROFILE} from "../profileReducer";


export type PostType = {
    id: number,
    message: string,
    likeCounts: string
}

type ContactsType = {
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
    small: string | null,
    large: string | null
}

export type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType,
    photos: PhotosType | null
}

export type PostDataType = {
    newPost: string,
    id: number
}
export type AddPostType = {
    type: typeof ADD_POST,
    postData: PostDataType
}

export type DeletePostType = {
    type: typeof DELETE_POST,
    id: number
}

export type SetUserProfileType ={
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
}



