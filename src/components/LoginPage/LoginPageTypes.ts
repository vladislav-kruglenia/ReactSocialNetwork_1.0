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
