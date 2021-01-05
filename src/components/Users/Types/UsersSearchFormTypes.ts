import {OnFilterChangedType} from "./UserUI-Types";
import {FilterType} from "../../../redux/Types/UsersReducerTypes";


export type UsersSearchFormPropsType = {
    filter: FilterType,
    onFilterChanged: OnFilterChangedType
}

export type FriendType = "null" | "true" | "false"

export type UsersSearchFormValuesType = {
    term: string,
    friend: FriendType
}
export type FormikHelpersOnSubmitType = {
    setSubmitting: (isSubmitting: boolean) => void
}
