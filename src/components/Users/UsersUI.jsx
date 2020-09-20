import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import s from "./Users.module.css"


let UsersUI = ({totalUsersCount, pageSize, currentPage, onPageChanged, ...props}) => {
    return <div>
        <div className={s.usersContainer}>
            {
                props.usersPage.map(u => <User
                    key={u.id}
                    user={u}
                    followingInProgress={props.followingInProgress}
                    unFollowUser={props.unFollowUser}
                    followUser={props.followUser}
                />)
            }
        </div>
        <Paginator
            totalItemsCount={totalUsersCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
        />
    </div>
}

export default UsersUI
