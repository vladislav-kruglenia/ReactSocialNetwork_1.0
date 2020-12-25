import {GetProfileResType, PutStatusResType, SavePhotoResType, SaveProfileDataResType} from "./ApiTypes";
import {ProfileType} from "../redux/Types/ProfileReducerTypes";
import {instance} from "./api";

export let profileAPI = {
    getProfile(numberID: number | null) {
        return instance.get<GetProfileResType>(`profile/${numberID}`)
            .then(response => {
                return response.data
            })
    },
    getStatus(numberID: number) {
        return instance.get<string>(`profile/status/${numberID}`).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<PutStatusResType>(`profile/status`, {status: status}).then(res => res.data)
    },
    saveProfileData(profile: ProfileType) {
        return instance.put<SaveProfileDataResType>(`profile`, profile).then(res => res.data)
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put<SavePhotoResType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    }
};