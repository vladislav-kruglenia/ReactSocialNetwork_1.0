import React, {FC, useEffect} from "react";
import Paginator from "../../common/Paginator/Paginator";
import User from "./User/User";
import s from "../Users.module.css"
import {UsersSearchForm} from "./UsersSearchForm";
import {OnFilterChangedType, UsersDomainParsed, UsersUIPropsType} from "../Types/UserUI-Types";
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
import {useHistory} from "react-router-dom";
import * as queryString from "querystring";


export let UsersUI: FC<UsersUIPropsType> = () => {
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getFilter);
    const users = useSelector(getUsers);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const parsed: UsersDomainParsed = queryString.parse(history.location.search.substr(1));
        let actualPage = parsed.page ? Number(parsed.page) : currentPage;
        let actualFilter = parsed.term
            ? {
                ...filter,
                term: parsed.term,
                friend: parsed.friend === 'null'
                    ? null
                    : parsed.friend === 'true'
            }
            : filter;

        dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter))
    }, []);

    useEffect(() => {
        const query: UsersDomainParsed = {};
        if(!!filter.term) query.term = filter.term;
        if(filter.friend !== null) query.friend = String(filter.friend);
        if(currentPage !== 1) query.page = String(currentPage);


        history.push({
            pathname: '/users',
            search: queryString.stringify(query)/*`?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`*/
        })
    }, [filter,currentPage]);

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
        <UsersSearchForm filter={filter} onFilterChanged={onFilterChanged}/>
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

