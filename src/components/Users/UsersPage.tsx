import React, {FC} from "react";
import {useSelector} from "react-redux";
import Preloader from "../common/Preloader/Preloader";
import {getIsFetching} from "../../redux/usersSelectors";
import {UsersPagePropsType} from "./Types/UsersPageTypes";
import {UsersUI} from "./UsersUI/UsersUI";


export const UsersPage: FC<UsersPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching);

    return <>
        <h1>{props.pageName}</h1>
        {isFetching ? <Preloader/> : null}
        <UsersUI />
    </>
};

