import {ProfileType} from "../../../redux/Types/ProfileReducerTypes";

export type PrContMapStatePropsType = {
    profile: ProfileType | null,
    isAuth: boolean,
    status: string,
    authorizedUserId: number | null
}
export type PrContOwnPropsType = {
    match: any,
    history: any,
}

export type PrContDispatchPropsType = {
    getProfileInfo: (numberID:number) => void,
    getUserStatus: (numberID:number) => void,
    updateUserStatus: (status: string) => void,
    savePhoto: (file:any) => void,
    saveProfileData: (profile:ProfileType) => void
}


export type ProfileContainerPropsType = PrContMapStatePropsType & PrContOwnPropsType & PrContDispatchPropsType


