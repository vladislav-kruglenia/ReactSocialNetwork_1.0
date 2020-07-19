import React from "react";
import {connect} from "react-redux";
import UsersUI from "./UsersUI";
import Preloader from "../common/Preloader/Preloader";
import {
    getUsersThunkCreator,
    pageChangeThunkCreator,
    followUserThunkCreator,
    unFollowUserThunkCreator
} from "../../redux/usersReducer";
import {withAuthRedirect} from "../../HighOrderComponents/widthAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";


class Users extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.pageChange(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <UsersUI totalUsersCount={this.props.totalUsersCount}
                     pageSize={this.props.pageSize}
                     currentPage={this.props.currentPage}
                     onPageChanged={this.onPageChanged}
                     usersPage={this.props.usersPage}
                     followingInProgress={this.props.followingInProgress}
                     followUser={this.props.followUser}
                     unFollowUser={this.props.unFollowUser}/>
        </>
    }
}

let dispatchObject = {
    getUsers: getUsersThunkCreator,
    pageChange: pageChangeThunkCreator,
    followUser: followUserThunkCreator,
    unFollowUser: unFollowUserThunkCreator
}

/*
let mapStateToProps = (state) => {
    return {
        usersPage: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}
*/

let mapStateToProps = (state) => {
    return {
        usersPage: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    connect(mapStateToProps, dispatchObject),
    withAuthRedirect
)(Users)

/*let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userID) => {
            dispatch(follow(userID))
        },
        unFollow: (userID) => {
            dispatch(unFollow(userID))
        },
        setUsers(users) {
            dispatch(setUsers(users))
        },
        setCurrentPage(pageNumber) {
            dispatch(setCurrentPage(pageNumber))
        },
        setTotalUsersCount(totalCountNumber) {
            dispatch(setTotalUsersCount(totalCountNumber))
        },
        changeFetching(isFetching) {
            dispatch(changeFetching(isFetching))
        }

    }
}*/