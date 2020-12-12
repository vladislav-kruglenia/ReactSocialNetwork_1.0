import {UserType} from '../../redux/Types/UsersReducerTypes'

export type UserPropsType = {
    user: UserType,
    followingInProgress: Array<number>,

    followUser: (userID:number) => void,
    unFollowUser: (userID:number) => void
}

export type UsersUIPropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    followingInProgress: Array<number>,
    usersPage: Array<UserType>,

    followUser: (userID:number) => void,
    unFollowUser: (userID:number) => void,
    onPageChanged: (p: number) => void,
}


/////////////////////////// UsersContainerProps ///////////////////////////
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
}

export type UsContDispatchPropsType = {
    followUser: (userID:number) => void,
    unFollowUser: (userID:number) => void,
    getUsers: (currentPage: number, pageSize: number) => void,
    pageChange: (pageNumber: number, pageSize: number) => void,
}

export type UsersContainerPropsType = UsContMapStatePropsType & UsContDispatchPropsType & UsContOwnPropsType
/////////////////////////// UsersContainerProps ///////////////////////////

