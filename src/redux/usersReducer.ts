import {updateObjectInArray} from "../utils/objectHelpers";
import {
    FilterType, StartStateType,
    UsersActionsTypes,
    UserType
} from "./Types/UsersReducerTypes";
import {DispatchType, ThunkType} from "./Types/CommonTypes";
import {usersApi} from "../api/users-api";
import {FollowResType} from "../api/ApiTypes";


export let startState = {
    users: [] as Array<UserType>,
    pageSize: 5, // сколько элементов будет на странице (задается вручную)
    totalUsersCount: 0,
    currentPage: 1, // номер активной ссылки
    isFetching: false,
    followingInProgress: [] as Array<number>,
    filter: {
        term: "",
        friend: null as null | boolean
    }
};



export let usersReducer = (state = startState, action: UsersActionsTypes): StartStateType => {
    switch (action.type) {
        case 'FOLLOW': {
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
        case 'UNFOLLOW': {
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
        case 'SET_USERS': {
            return {...state, users: action.users}
        }
        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case 'CHANGE_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'SET_FILTER': {
            return { ...state, filter: action.payload }
        }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
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
export let actions = {
    setFilter: (filter: FilterType) => {
        return {
            type: 'SET_FILTER',
            payload: filter
        } as const
    },
    follow: (userID: number) => {
        return {
            type: 'FOLLOW',
            id: userID
        } as const
    },
    unFollow: (userID: number) => {
        return {
            type: 'UNFOLLOW',
            id: userID
        } as const
    },
    setUsers: (state: Array<UserType>) => {
        return {
            type: 'SET_USERS',
            users: state
        } as const
    },
    setCurrentPage: (pageNumber: number) => {
        return {
            type: 'SET_CURRENT_PAGE',
            currentPage: pageNumber
        } as const
    },
    setTotalUsersCount: (totalCountNumber: number) => {
        return {
            type: 'SET_TOTAL_USERS_COUNT',
            totalUsersCount: totalCountNumber
        } as const
    },
    changeFetching: (isFetching: boolean) => {
        return {
            type: 'CHANGE_FETCHING',
            isFetching: isFetching
        } as const
    },
    changeFollowingProgress: (progress: boolean, userID: number) => {
        return {
            type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
            followingInProgress: progress,
            userID
        } as const
    },
};


//actionCreators

//thunkCreators

export let getUsersThunkCreator = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.changeFetching(true));
        dispatch(actions.setFilter(filter));
        dispatch(actions.setCurrentPage(currentPage));
        let response = await usersApi.getUsers(currentPage, pageSize, filter);
        dispatch(actions.changeFetching(false));
        dispatch(actions.setUsers(response.items));
        dispatch(actions.setTotalUsersCount(response.totalCount))
    }
};
export let pageChangeThunkCreator = (pageNumber: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.changeFetching(true));
        dispatch(actions.setCurrentPage(pageNumber));
        let response = await usersApi.getUsers(pageNumber, pageSize, filter);
        dispatch(actions.changeFetching(false));
        dispatch(actions.setUsers(response.items))
    }
};

let followUnfollowFlow = async (dispatch: DispatchType,
                                userID: number,
                                apiMethod: (userID: number) => Promise<FollowResType>,
                                actionCreator: (userId: number) => UsersActionsTypes) => {
    dispatch(actions.changeFollowingProgress(true, userID));
    let response = await apiMethod(userID);
    if (response.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(actions.changeFollowingProgress(false, userID))
};

export let followUserThunkCreator = (userID: number): ThunkType => {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userID, usersApi.follow.bind(usersApi), actions.follow)
    }
};

export let unFollowUserThunkCreator = (userID: number): ThunkType => {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userID, usersApi.unFollow.bind(usersApi), actions.unFollow)
    }
};
//thunkCreators


export default usersReducer


