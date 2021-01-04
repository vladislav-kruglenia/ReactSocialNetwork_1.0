import {OnFilterChangedType} from "./UserUI-Types";


export type UsersSearchFormPropsType = {
    onFilterChanged: OnFilterChangedType
}

export type UsersSearchFormValuesType = {
    term: string,
    friend: "null" | "true" | "false"
}
export type FormikHelpersOnSubmitType = {
    setSubmitting: (isSubmitting: boolean) => void
}
