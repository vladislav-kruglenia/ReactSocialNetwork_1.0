import {ProfileType} from "../../../redux/Types/ProfileReducerTypes";

export type ProfileInfoPropsType = {
    profile: ProfileType | null,
    status: string,
    isOwner: boolean,


    updateStatus: (status: string) => void,
    saveProfileData: (formData:ProfileType) => any
}

export type ProfileDataPropsType = {
    profile: ProfileType,
    isOwner: boolean,

    goToEditPage: () => void,
}