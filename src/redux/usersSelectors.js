import {createSelector} from "reselect";

let getUsersSelector = (state) =>{
    return state.usersPage.users
}

export let getUsers = createSelector(getUsersSelector, (users) =>{
    return users.filter(u => true)
})

export let getPageSize = (state) =>{
    return state.usersPage.pageSize
}
export let getTotalUsersCount = (state) =>{
    return state.usersPage.totalUsersCount
}

export let getCurrentPage = (state) =>{
    return state.usersPage.currentPage
}
export let getIsFetching = (state) =>{
    return state.usersPage.isFetching
}
export let getFollowingInProgress = (state) =>{
    return state.usersPage.followingInProgress
}


