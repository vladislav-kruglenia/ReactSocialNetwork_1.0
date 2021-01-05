import {FilterType} from "../../../redux/Types/UsersReducerTypes";


export type UsersUIPropsType = {

}

export type UsersDomainParsed = {
    term?: string,
    friend?: string,
    page?: string
}

export type OnFilterChangedType = (filter: FilterType) => void

