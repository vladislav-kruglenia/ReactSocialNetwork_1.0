import {ProfileType} from "../../../redux/Types/ProfileReducerTypes";

export type ProfileDataFormOwnProps = {
    profile: ProfileType,

    exitToEditPage: () => void
}

export type ProfileDataValuesTypeKeys = Extract<keyof ProfileType, string>