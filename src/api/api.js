import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "b62906a1-ef51-4529-9972-b0f72b1f58cb"
    }
})


export let usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(userID) {
        return instance.post(`follow/${userID}`)
            .then(response => {
                return response.data
            })

    },
    unFollow(userID) {
        return instance.delete(`follow/${userID}`)
            .then(response => {
                return response.data
            })
    },
    getProfile(numberID) {
        console.warn('Obsolete method. Please use profileAPI object')
        return profileAPI.getProfile(numberID)
    }

}

export let authAPI = {
    me(){
        return instance.get(`auth/me`)
            .then(response => {
                return response.data
            })
    },
    login(email, password, rememberMe = false, captcha = null){
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    }

}

export let securityAPI = {
    captchaUrl(){
        return instance.get(`/security/get-captcha-url`)
    }

}

export let profileAPI = {
    getProfile(numberID) {
        return instance.get(`profile/${numberID}`)
            .then(response => {
                return response.data
            })
    },
    getStatus(numberID) {
        return instance.get(`profile/status/${numberID}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`,{status: status})
    },
    saveProfileData(profile) {
        return instance.put(`profile`, profile)
    },
    savePhoto(photoFile) {
        const formData = new FormData()
        formData.append("image",photoFile)

        return instance.put(`profile/photo`,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
    }

}
