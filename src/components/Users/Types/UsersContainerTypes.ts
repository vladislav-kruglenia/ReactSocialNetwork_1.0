import {FilterType, UserType} from "../../../redux/Types/UsersReducerTypes";

export type UsContOwnPropsType = {
    pageName: string
}
export type UsContMapStatePropsType = {
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    totalUsersCount: number,
    usersPage: Array<UserType>,
    followingInProgress: Array<number>,
    filter: FilterType,
}
export type UsContDispatchPropsType = {
    followUser: (userID: number) => void,
    unFollowUser: (userID: number) => void,
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void,
    pageChange: (pageNumber: number, pageSize: number, filter: FilterType) => void,
}

export type OnFilterChangedType = (filter: FilterType) => void

export type UsersContainerPropsType = UsContMapStatePropsType & UsContDispatchPropsType & UsContOwnPropsType