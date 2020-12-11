import {createSelector} from "reselect";
import {AppStateType} from "./storeRedux";

export let getPageSize = (state:AppStateType) =>{
    return state.usersPage.pageSize
};
export let getTotalUsersCount = (state:AppStateType) =>{
    return state.usersPage.totalUsersCount
};

export let getCurrentPage = (state:AppStateType) =>{
    return state.usersPage.currentPage
};
export let getIsFetching = (state:AppStateType) =>{
    return state.usersPage.isFetching
};
export let getFollowingInProgress = (state:AppStateType) =>{
    return state.usersPage.followingInProgress
};

let getUsersSelector = (state:AppStateType) =>{
    return state.usersPage.users
};

export let getUsers = createSelector(getUsersSelector, (users) =>{
    return users.filter(user => true)
});


