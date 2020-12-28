import {ProfileType} from "../../../redux/Types/ProfileReducerTypes";

export type ProfileInfoPropsType = {
    profile: ProfileType | null,
    status: string,
    isOwner: boolean,

    savePhoto: (file: File) => void,
    updateStatus: (status: string) => void,
    saveProfileData: (formData:ProfileType) => Promise<any>
}

export type ProfileDataPropsType = {
    profile: ProfileType,
    isOwner: boolean,

    goToEditPage: () => void,
}