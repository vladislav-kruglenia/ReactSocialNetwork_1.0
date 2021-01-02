import React from "react";
import {connect} from "react-redux";
import UsersUI from "./UsersUI/UsersUI";
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
    getCurrentPage, getFilter,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";
import {AppStateType} from "../../redux/storeRedux";
import {
    OnFilterChangedType,
    UsContDispatchPropsType,
    UsContMapStatePropsType,
    UsContOwnPropsType,
    UsersContainerPropsType
} from "./Types/UsersContainerTypes";


class Users extends React.Component<UsersContainerPropsType>{
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize,  {
            term: "",
            friend: null
        })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.pageChange(pageNumber, this.props.pageSize, this.props.filter)
    };

    onFilterChanged: OnFilterChangedType = (filter) => {
        const {pageSize} = this.props;
        this.props.getUsers(1, pageSize, filter)
    };

    render() {
        return <>
            <h1>{this.props.pageName}</h1>
            {this.props.isFetching ? <Preloader/> : null}
            <UsersUI totalUsersCount={this.props.totalUsersCount}
                     pageSize={this.props.pageSize}
                     currentPage={this.props.currentPage}
                     onPageChanged={this.onPageChanged}
                     onFilterChanged={this.onFilterChanged}
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
        followingInProgress: getFollowingInProgress(state),
        filter: getFilter(state),
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