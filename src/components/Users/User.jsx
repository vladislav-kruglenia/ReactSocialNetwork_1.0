import React from "react";
import s from "./Users.module.css"
import userPhoto from '../../img/User.jpg'
import {NavLink} from "react-router-dom";


let User = ({user,...props}) => {
    let u = user
    return (
        <>
            <NavLink to={'/profile/' + u.id}>
                <div className={s.img}><img src={
                    u.photos.small != null ? u.photos.small : userPhoto
                } alt={''}/></div>
            </NavLink>
            <div className="button">
                {u.followed
                    ? <button
                        disabled={props.followingInProgress.some(id => id === u.id)}
                        onClick={() => {
                            props.unFollowUser(u.id)
                        }}>UnFollow</button>
                    : <button
                        disabled={props.followingInProgress.some(id => id === u.id)}
                        onClick={() => {
                            props.followUser(u.id)
                        }}>Follow</button>
                }
            </div>
            <div className="name">{u.name}</div>
            <div className="status">{u.status}</div>
            <div className="country">{"u.location.country"}</div>
            <div className="city">{"u.location.city"}</div>
        </>
    )
}

export default User
