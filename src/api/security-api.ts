import {CaptchaUrlResponseType} from "./ApiTypes";
import {instance} from "./api";

export let securityAPI = {
    captchaUrl() {
        return instance.get<CaptchaUrlResponseType>(`/security/get-captcha-url`)
            .then(response => {
                return response.data
            })
    }

};