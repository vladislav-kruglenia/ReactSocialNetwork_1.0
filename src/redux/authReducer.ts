import {stopSubmit} from "redux-form";
import {
    AuthActionsTypes,
    StartStateType,
    ThunkType
} from "./Types/AuthReducerTypes";
import {ResultCodeForCaptcha, ResultCodesEnum} from "../api/ApiTypes";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

let startState: StartStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaURL: null
};

let authReducer = (state = startState, action: AuthActionsTypes): StartStateType => {
    switch (action.type) {
        case "SET_USER_DATA": {
            return {
                ...state,
                ...action.data
            }
        }
        case "SET_CAPTCHA_URL": {
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
export let actions = {
    setUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => {
        return {
            type: "SET_USER_DATA",
            data: {id, email, login, isAuth}
        } as const
    },

    setCaptchaUrl: (url: string) => {
        return {
            type: "SET_CAPTCHA_URL",
            captchaURL: url
        } as const
    },
};
//actionCreators

//thunkCreators
export let authMeThunkCreator = (): ThunkType => async (dispatch) => {
    let response = await authAPI.me();
    if (response.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = response.data;
        dispatch(actions.setUserData(id, email, login, true))
    }
};

export let loginThunkCreator = (login: string, password: string, rememberMe: boolean = false, captchaURL: string | null = null): ThunkType => {
    return async (dispatch) => {
        let responseData = await authAPI.login(login, password, rememberMe, captchaURL);
        if (responseData.resultCode === ResultCodesEnum.Success) {
            await  dispatch(authMeThunkCreator())
        } else {
            if (responseData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                await  dispatch(getCaptchaThunkCreator())
            }

            let message = responseData.messages.length > 0 ? responseData.messages[0] : "Some error";
            dispatch(stopSubmit("login", {_error: message}))
        }
    }
};

export let getCaptchaThunkCreator = (): ThunkType => async (dispatch) => {
    let response = await securityAPI.captchaUrl();
    let captcha = response.url;
    dispatch(actions.setCaptchaUrl(captcha))
};

export let logoutThunkCreator = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(actions.setUserData(null, null, null, false))
    }
};
//thunkCreators


export default authReducer