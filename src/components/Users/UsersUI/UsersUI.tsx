import React, {FC} from "react";
import Paginator from "../../common/Paginator/Paginator";
import User from "./User/User";
import s from "../Users.module.css"
import {UsersSearchForm} from "./UsersSearchForm";
import {UsersUIPropsType} from "../Types/UserUI-Types";


let UsersUI: FC<UsersUIPropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged, ...props}) => {
    return <div>
        <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
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
};

export default UsersUI
