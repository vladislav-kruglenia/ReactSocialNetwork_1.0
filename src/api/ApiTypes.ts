import {UserType} from "../redux/Types/UsersReducerTypes";
import {ProfileType} from "../redux/Types/ProfileReducerTypes";


export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}


export type MeResponceType = {
    data: {
        id: number,
        email: string,
        login: string
    },
    resultCode: ResultCodesEnum,
    messages: Array<string>
}

export type LoginResponceType ={
    resultCode: ResultCodesEnum | ResultCodeForCaptcha,
    messages: Array<string>,
    data: {userId: number}
}

export type LogoutResponceType ={
    resultCode: number,
    messages: Array<string>,
    data: Object
}

export type CaptchaUrlResponceType ={
    url: string
}


export type GetUsersResType = {
    items: Array<UserType>,
    totalCount: number,
    error: string
}

export type FollowResType = {
    resultCode: number,
    messages: Array<string>,
    data: Object
}

export type GetProfileResType = ProfileType


export type PutStatusResType = LogoutResponceType

export type SaveProfileDataResType = LogoutResponceType



