import {ProfileType} from "../../../redux/Types/ProfileReducerTypes";

export type ProfilePropsTypes ={
    isOwner: boolean,
    profile: ProfileType | null,
    status: string,

    updateStatus: (status: string) => void,
    savePhoto: (file:any) => void,
    saveProfileData: (profile:ProfileType) => void
}