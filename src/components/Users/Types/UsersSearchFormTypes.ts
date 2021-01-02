import {OnFilterChangedType} from "./UsersContainerTypes";

export type UsersSearchFormValuesType = {
    term: string,
    friend: "null" | "true" | "false"
}
export type FormikHelpersOnSubmitType = {
    setSubmitting: (isSubmitting: boolean) => void
}
export type UsersSearchFormPropsType = {
    onFilterChanged: OnFilterChangedType
}