import Hardi from "../../../../img/User.jpg";
import style1 from "../ProfileInfo.module.css";
import style2 from "./ProfileImg.module.css";

import React from "react";

export const ProfileImg = (props) => {
    let onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return <div className={style2.imgContainer}>
        <img src={props.profile.photos.large || Hardi} alt="" className={style1.logo}/>
        {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
    </div>
}