import axios from "axios";
import {ProfileType} from "../redux/Types/ProfileReducerTypes";
import {
    CaptchaUrlResponceType, FollowResType, GetProfileResType,
    GetUsersResType,
    LoginResponceType,
    LogoutResponceType,
    MeResponceType, PutStatusResType, SaveProfileDataResType
} from "./ApiTypes";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "b62906a1-ef51-4529-9972-b0f72b1f58cb"
    }
});


export let usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUsersResType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(userID: number) {
        return instance.post<FollowResType>(`follow/${userID}`)
            .then(response => {
                return response.data
            })

    },
    unFollow(userID: number) {
        return instance.delete<FollowResType>(`follow/${userID}`)
            .then(response => {
                return response.data
            })
    },
    getProfile(numberID: number | null) {
        console.warn('Obsolete method. Please use profileAPI object');
        return profileAPI.getProfile(numberID)
    }

};

export let authAPI = {
    me() {
        return instance.get<MeResponceType>(`auth/me`)
            .then(response => {
                return response.data
            })
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<LoginResponceType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => {
                return response.data
            })
    },
    logout() {
        return instance.delete<LogoutResponceType>(`auth/login`)
    }

};

export let securityAPI = {
    captchaUrl() {
        return instance.get<CaptchaUrlResponceType>(`/security/get-captcha-url`)
    }

};

export let profileAPI = {
    getProfile(numberID: number | null) {
        return instance.get<GetProfileResType>(`profile/${numberID}`)
            .then(response => {
                return response.data
            })
    },
    getStatus(numberID: number) {
        return instance.get<string>(`profile/status/${numberID}`)
    },
    updateStatus(status: string) {
        return instance.put<PutStatusResType>(`profile/status`, {status: status})
    },
    saveProfileData(profile: ProfileType) {
        return instance.put<SaveProfileDataResType>(`profile`, profile)
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
};
