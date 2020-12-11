import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {SetCaptchaUrlAction, SetUserDataActionType, StartStateType} from "./Types/AuthReducerTypes";

export const SET_USER_DATA = "AUTH_SET_USER_DATA";
export const SET_CAPTCHA_URL = "SET_CAPTCHA_URL";

let startState: StartStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaURL: null
};

let authReducer = (state = startState, action: any):StartStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data
            }
        }
        case SET_CAPTCHA_URL: {
            return {
                ...state,
                captchaURL: action.captchaURL
            }
        }

        default:
            return state
    }
};

//actionCreators

export let setUserData = (id: number|null, email: string|null, login: string|null, isAuth: boolean):SetUserDataActionType => {
    return {
        type: SET_USER_DATA,
        data: {id, email, login, isAuth}
    }
};

export let setCaptchaUrl = (url: string): SetCaptchaUrlAction => {
    return {
        type: SET_CAPTCHA_URL,
        captchaURL: url
    }
};
//actionCreators

//thunkCreators
export let authMeThunkCreator = () => async (dispatch: any) => {
    let response = await authAPI.me();
    if (response.resultCode === 0) {
        let {id, email, login} = response.data;
        dispatch(setUserData(id, email, login, true))
    }
};


export let loginThunkCreator = (login: string, password: string, rememberMe = false, captchaURL = null) => async (dispatch: any) => {
    let response = await authAPI.login(login, password, rememberMe, captchaURL);
    if (response.data.resultCode === 0) {
        dispatch(authMeThunkCreator())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaThunkCreator())
        }

        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}))
    }
};
export let getCaptchaThunkCreator = () => async (dispatch: any) => {
    let response = await securityAPI.captchaUrl();
    let captcha = response.data.url;

    dispatch(setCaptchaUrl(captcha))
};


export let logoutThunkCreator = () => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
    }
};
//thunkCreators


export default authReducer


/*[
    {
    id: 1,
    imgURL: "http://images6.fanpop.com/image/photos/40300000/Vlad-Was-Looking-For-His-Wife-Mirena-vlad-tepes-iii-40312885-300-447.jpg",
    followed: true,
    name: 'Anton',
    status: "i'm not alcoholic",
    location: {city: "Minsk", country: "Belarus"}
}
]*/