import {UserType} from "../../../redux/Types/UsersReducerTypes";

export type UserPropsType = {
    user: UserType,
    followingInProgress: Array<number>,

    followUser: (userID: number) => void,
    unFollowUser: (userID: number) => void
}