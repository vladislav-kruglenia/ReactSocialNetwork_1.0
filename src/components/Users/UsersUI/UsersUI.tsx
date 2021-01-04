import React, {FC, useEffect} from "react";
import Paginator from "../../common/Paginator/Paginator";
import User from "./User/User";
import s from "../Users.module.css"
import {UsersSearchForm} from "./UsersSearchForm";
import {OnFilterChangedType, UsersUIPropsType} from "../Types/UserUI-Types";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFilter,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../../redux/usersSelectors";
import {
    followUserThunkCreator,
    getUsersThunkCreator,
    pageChangeThunkCreator,
    unFollowUserThunkCreator
} from "../../../redux/usersReducer";


export let UsersUI: FC<UsersUIPropsType> = () => {
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getFilter);
    const users = useSelector(getUsers);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersThunkCreator(currentPage, pageSize, {
            term: "",
            friend: null
        }))
    }, []);

    const onPageChanged = (pageNumber: number) => {
        dispatch(pageChangeThunkCreator(pageNumber, pageSize, filter))
    };

    const onFilterChanged: OnFilterChangedType = (filter) => {
        dispatch(getUsersThunkCreator(1, pageSize, filter))
    };

    const followUser = (userID: number) => {
        dispatch(followUserThunkCreator(userID))
    };

    const unFollowUser = (userID: number) => {
        dispatch(unFollowUserThunkCreator(userID))
    };


    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged}/>
        <div className={s.usersContainer}>
            {
                users.map(u => <User
                    key={u.id}
                    user={u}
                    followingInProgress={followingInProgress}
                    followUser={followUser}
                    unFollowUser={unFollowUser}
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

