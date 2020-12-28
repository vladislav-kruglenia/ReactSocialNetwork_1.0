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
import {withAuthRedirect} from "../../HighOrderComponents/widthAuthRedirect/widthAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";
import {
    UsContDispatchPropsType,
    UsContMapStatePropsType,
    UsContOwnPropsType,
    UsersContainerPropsType
} from "./UsersTypes";
import {AppStateType} from "../../redux/storeRedux";


class Users extends React.Component<UsersContainerPropsType>{
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.pageChange(pageNumber, this.props.pageSize)
    };

    render() {
        return <>
            <h1>{this.props.pageName}</h1>
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

let mapStateToProps = (state:AppStateType):UsContMapStatePropsType => {
    return {
        usersPage: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
};
let dispatchObject = {
    getUsers: getUsersThunkCreator,
    pageChange: pageChangeThunkCreator,
    followUser: followUserThunkCreator,
    unFollowUser: unFollowUserThunkCreator
};


export default compose<React.ComponentType<UsContOwnPropsType>>(
    connect<UsContMapStatePropsType, UsContDispatchPropsType, UsContOwnPropsType, AppStateType>(mapStateToProps, dispatchObject),
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