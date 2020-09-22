import React from 'react';
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = (props) => {

    return <div className={s.header}>
        <div className={s.headerContainer}>
            <div className={s.titleHeader}>Social network</div>
            <div className={s.loginBlock}>
                {
                    props.isAuth
                        ? <div>{props.login} - <button onClick={props.logout}>Exit</button></div>
                        : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </div>
    </div>
}

export default Header