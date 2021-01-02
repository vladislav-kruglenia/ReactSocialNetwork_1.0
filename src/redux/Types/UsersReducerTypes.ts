import {PhotosType} from "./ProfileReducerTypes";
import {
    actions, startState
} from "../usersReducer";
import {InferActionsTypes} from "../storeRedux";

export type UserType = {
    id: number,
    name: string,
    status: string | null,
    photos: PhotosType,
    followed: boolean,
    uniqueUrlName: string | null
}

export type StartStateType = typeof startState
export type FilterType = typeof startState.filter



/*export type FollowOrUnFollowActionType = {
    type: typeof FOLLOW | typeof UNFOLLOW,
    id: number
}

export type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}

export type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}

export type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
}
export type ChangeFetchingActionType = {
    type: typeof CHANGE_FETCHING,
    isFetching: boolean
}
export type ChangeFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    followingInProgress: boolean,
    userID: number
}*/

export type UsersActionsTypes = InferActionsTypes<typeof actions>

