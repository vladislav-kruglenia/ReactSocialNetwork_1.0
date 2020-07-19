import React from "react";
import s from "./Users.module.css"
import userPhoto from '../../img/User.jpg'
import {NavLink} from "react-router-dom";


let UsersUI = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p && s.selectedPage}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>
        {
            props.usersPage.map(u => {
                return <div>
                    <NavLink to={'/profile/' + u.id}>
                        <div className={s.img}><img src={
                            u.photos.small != null ? u.photos.small : userPhoto
                        } alt={''}/></div>
                    </NavLink>
                    <div className="button">
                        {u.followed
                            ? <button
                                disabled={props.followingInProgress.some(id => id===u.id)}
                                onClick={() => {props.unFollowUser(u.id)}}>UnFollow</button>
                            : <button
                                disabled={props.followingInProgress.some(id => id===u.id)}
                                onClick={() => {props.followUser(u.id)}}>Follow</button>
                        }
                    </div>
                    <div className="name">{u.name}</div>
                    <div className="status">{u.status}</div>
                    <div className="country">{"u.location.country"}</div>
                    <div className="city">{"u.location.city"}</div>
                </div>
            })
        }
    </div>
}

export default UsersUI
