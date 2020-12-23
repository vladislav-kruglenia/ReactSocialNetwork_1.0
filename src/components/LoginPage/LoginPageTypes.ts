export type MapStatePropsType = {
    isAuth: boolean,
    captchaURL: string | null
}

export type MapDispatchPropsType = {
    loginThunkCreator: (login: string, password: string, rememberMe: boolean, captchaURL?: string) => void
}

export type MapOwnPropsType = {}

export type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captchaURL: string,
}

export type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

export type LoginFormOwnProps = {
    captchaURL: string | null
}
