import {UserType} from "../../../redux/Types/UsersReducerTypes";
import {OnFilterChangedType} from "./UsersContainerTypes";

export type UsersUIPropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    followingInProgress: Array<number>,
    usersPage: Array<UserType>,

    followUser: (userID: number) => void,
    unFollowUser: (userID: number) => void,
    onPageChanged: (p: number) => void,
    onFilterChanged: OnFilterChangedType
}

