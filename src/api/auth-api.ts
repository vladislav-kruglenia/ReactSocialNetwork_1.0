import {LoginResponseType, LogoutResponseType, MeResponseType} from "./ApiTypes";
import {instance} from "./api";

export let authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`)
            .then(response => {
                return response.data
            })
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => {
                return response.data
            })
    },
    logout() {
        return instance.delete<LogoutResponseType>(`auth/login`)
    }

};