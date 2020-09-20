import React from "react";
import userPhoto from '../../img/User.jpg'
import {NavLink} from "react-router-dom";
import s from "./Users.module.css"
import s2 from "../common/Button.module.css";


let User = ({user, ...props}) => {
    let u = user
    return (
        <div className={s.userContainer}>
            <div className={s.userLeftContainer}>
                <NavLink to={'/profile/' + u.id}>
                    <img src={
                        u.photos.small != null ? u.photos.small : userPhoto
                    } alt={''}/>
                </NavLink>
                <div className={s.userInfo}>
                    <div className={s.userName}>{u.name}</div>
                    <div className="status">{u.status}</div>
                </div>
            </div>
            <div className={s.buttonFollowing}>
                {u.followed
                    ? <button
                        className={s2.buttonStyle}
                        disabled={props.followingInProgress.some(id => id === u.id)}
                        onClick={() => {
                            props.unFollowUser(u.id)
                        }}>UnFollow</button>
                    : <button
                        className={s2.buttonStyle}
                        disabled={props.followingInProgress.some(id => id === u.id)}
                        onClick={() => {
                            props.followUser(u.id)
                        }}>Follow</button>
                }
            </div>
        </div>
    )
}

export default User
