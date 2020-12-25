import {UserType} from "../redux/Types/UsersReducerTypes";
import {PhotosType, ProfileType} from "../redux/Types/ProfileReducerTypes";


export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type ResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D,
    resultCode: RC,
    messages: Array<string>
}

export type MeResponseType = ResponseType<{
    id: number,
    email: string,
    login: string
}>

export type LoginResponseType = ResponseType<{userId: number}, ResultCodesEnum | ResultCodeForCaptcha>


export type LogoutResponseType = ResponseType



export type CaptchaUrlResponseType = {
    url: string
}


export type GetUsersResType = {
    items: Array<UserType>,
    totalCount: number,
    error: string | null
}

export type FollowResType = ResponseType

export type GetProfileResType = ProfileType

export type PutStatusResType = ResponseType

export type SaveProfileDataResType = ResponseType

export type SavePhotoResType = ResponseType<{
    photos: PhotosType
}>



