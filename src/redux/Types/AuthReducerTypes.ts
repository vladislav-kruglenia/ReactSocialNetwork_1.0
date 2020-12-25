import {actions} from "../authReducer";
import {BaseThunkType, InferActionsTypes} from "../storeRedux";
import {stopSubmit} from "redux-form";

export type StartStateType = {
    id: number | null,
    login: null | string,
    email: string | null,
    isAuth: boolean,
    captchaURL: string | null
}

export type AuthActionsTypes = InferActionsTypes<typeof actions>

export type ThunkType = BaseThunkType<AuthActionsTypes | ReturnType<typeof stopSubmit>>


/*type SetUserDataType = {
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
}*/

//export type AuthActionsTypes = SetUserDataActionType | SetCaptchaUrlActionType