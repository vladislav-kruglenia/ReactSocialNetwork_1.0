import React from "react";
import s from "./Users.module.css"
import userPhoto from '../../img/User.jpg'
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


let UsersUI = ({totalUsersCount, pageSize, currentPage, onPageChanged, ...props}) => {
    return <div>
        <Paginator
            totalUsersCount={totalUsersCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
        />
        {
            props.usersPage.map(u => <User
                user={u}
                followingInProgress={props.followingInProgress}
                unFollowUser={props.unFollowUser}
                followUser={props.followUser}
            />)
        }
    </div>
}

export default UsersUI
