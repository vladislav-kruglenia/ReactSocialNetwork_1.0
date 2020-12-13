import {SET_CAPTCHA_URL, SET_USER_DATA} from "../authReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../storeRedux";

export type StartStateType = {
    id: number | null,
    login: null | string,
    email: string | null,
    isAuth: boolean,
    captchaURL: string | null
}

type SetUserDataType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
export type SetUserDataActionType = {
    type: typeof SET_USER_DATA,
    data: SetUserDataType
}

export type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL,
    captchaURL: string
}

export type AuthActionsTypes = SetUserDataActionType | SetCaptchaUrlActionType

export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AuthActionsTypes>