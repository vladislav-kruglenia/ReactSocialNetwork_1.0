import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objectHelpers";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const CHANGE_FETCHING = "CHANGE_FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"


let startState = {
    users: [],
    pageSize: 5, // сколько элементов будет на странице (задается вручную)
    totalUsersCount: 0,
    currentPage: 1, // номер активной ссылки
    isFetching: false,
    followingInProgress: []
}

let usersReducer = (state = startState, action) => {
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
                users: updateObjectInArray(state.users,action.id,"id",{followed: true})

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
                users: updateObjectInArray(state.users,action.id,"id",{followed: false})
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
}


//actionCreators
export let follow = (userID) => {
    return {
        type: FOLLOW,
        id: userID
    }
}
export let unFollow = (userID) => {
    return {
        type: UNFOLLOW,
        id: userID
    }
}
export let setUsers = (state) => {
    return {
        type: SET_USERS,
        users: state
    }
}
export let setCurrentPage = (pageNumber) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: pageNumber
    }
}
export let setTotalUsersCount = (totalCountNumber) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount: totalCountNumber
    }
}
export let changeFetching = (isFetching) => {
    return {
        type: CHANGE_FETCHING,
        isFetching: isFetching
    }
}
export let changeFollowingProgress = (progress, userID) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        followingInProgress: progress,
        userID
    }
}
//actionCreators

//thunkCreators
export let getUsersThunkCreator = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(changeFetching(true))
        let response = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(changeFetching(false))
        dispatch(setUsers(response.items))
        dispatch(setTotalUsersCount(response.totalCount))
    }
}
export let pageChangeThunkCreator = (pageNumber, pageSize) => {
    return async (dispatch) => {
        dispatch(changeFetching(true))
        dispatch(setCurrentPage(pageNumber))
        let response = await usersAPI.getUsers(pageNumber, pageSize)
        dispatch(changeFetching(false))
        dispatch(setUsers(response.items))
    }
}

let followUnfollowFlow = async (dispatch,userID,apiMethod,actionCreator) =>{
    dispatch(changeFollowingProgress(true, userID))
    let response = await apiMethod(userID)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(changeFollowingProgress(false, userID))
}

export let followUserThunkCreator = (userID) => {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch,userID,usersAPI.follow.bind(usersAPI), follow)
    }
}
export let unFollowUserThunkCreator = (userID) => {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch,userID,usersAPI.unFollow.bind(usersAPI), unFollow)
    }
}
//thunkCreators


export default usersReducer


