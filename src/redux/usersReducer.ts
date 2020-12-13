import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objectHelpers";
import {
    ChangeFetchingActionType, ChangeFollowingProgressActionType,
    FollowOrUnFollowActionType,
    SetCurrentPageActionType,
    SetTotalUsersCountActionType,
    SetUsersActionType, UsersActionsTypes,
    UserType
} from "./Types/UsersReducerTypes";
import { ThunkType } from "./Types/CommonTypes";

export const FOLLOW = "FOLLOW";
export const UNFOLLOW = "UNFOLLOW";
export const SET_USERS = "SET_USERS";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
export const CHANGE_FETCHING = "CHANGE_FETCHING";
export const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";


let startState = {
    users: [] as Array<UserType>,
    pageSize: 5, // сколько элементов будет на странице (задается вручную)
    totalUsersCount: 0,
    currentPage: 1, // номер активной ссылки
    isFetching: false,
    followingInProgress: [] as Array<number>
};

type StartStateType = typeof startState

let usersReducer = (state = startState, action: UsersActionsTypes): StartStateType => {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                /*users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: true}
                    }
                    return u
                })*/
                users: updateObjectInArray(state.users, action.id, "id", {followed: true})

            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                /*users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: false}
                    }
                    return u
                })*/
                users: updateObjectInArray(state.users, action.id, "id", {followed: false})
            }
        }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case CHANGE_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
        debugger
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id !== action.userID)
            }
        }
        default:
            return state
    }
};


//actionCreators
export let follow = (userID: number): FollowOrUnFollowActionType => {
    return {
        type: FOLLOW,
        id: userID
    }
};

export let unFollow = (userID: number): FollowOrUnFollowActionType => {
    return {
        type: UNFOLLOW,
        id: userID
    }
};

export let setUsers = (state: Array<UserType>): SetUsersActionType => {
    return {
        type: SET_USERS,
        users: state
    }
};

export let setCurrentPage = (pageNumber: number): SetCurrentPageActionType => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: pageNumber
    }
};

export let setTotalUsersCount = (totalCountNumber: number): SetTotalUsersCountActionType => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount: totalCountNumber
    }
};

export let changeFetching = (isFetching: boolean): ChangeFetchingActionType => {
    return {
        type: CHANGE_FETCHING,
        isFetching: isFetching
    }
};

export let changeFollowingProgress = (progress: boolean, userID: number): ChangeFollowingProgressActionType => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        followingInProgress: progress,
        userID
    }
};
//actionCreators

//thunkCreators

export let getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(changeFetching(true));
        let response = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(changeFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setTotalUsersCount(response.totalCount))
    }
};
export let pageChangeThunkCreator = (pageNumber: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(changeFetching(true));
        dispatch(setCurrentPage(pageNumber));
        let response = await usersAPI.getUsers(pageNumber, pageSize);
        dispatch(changeFetching(false));
        dispatch(setUsers(response.items))
    }
};

let followUnfollowFlow = (userID: number,
                          apiMethod: any,
                          actionCreator: (userId: number) => FollowOrUnFollowActionType
): ThunkType => {
    return async (dispatch) => {
        dispatch(changeFollowingProgress(true, userID));
        let response = await apiMethod(userID);
        if (response.resultCode === 0) {
            dispatch(actionCreator(userID))
        }
        dispatch(changeFollowingProgress(false, userID))
    }
};

export let followUserThunkCreator = (userID: number): ThunkType => {
    return async () => {
        await followUnfollowFlow(userID, usersAPI.follow.bind(usersAPI), follow)
    }
};

export let unFollowUserThunkCreator = (userID: number): ThunkType => {
    return async () => {
        await followUnfollowFlow(userID, usersAPI.unFollow.bind(usersAPI), unFollow)
    }
};
//thunkCreators


export default usersReducer


