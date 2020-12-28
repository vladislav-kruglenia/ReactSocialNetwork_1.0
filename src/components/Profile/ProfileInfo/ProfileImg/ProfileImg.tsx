import Hardi from "../../../../img/User.jpg";
import style1 from "../ProfileInfo.module.css";
import style2 from "./ProfileImg.module.css";

import React, {ChangeEvent, FC} from "react";
import {ProfileImgProps} from "../../Types/ProfileImgTypes";


export const ProfileImg:FC<ProfileImgProps> = (props) => {

    let onMainPhotoSelected = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    };
    return <div className={style2.imgContainer}>
        <img src={(props.photos && props.photos.large) || Hardi} alt="" className={style1.logo}/>
        {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
    </div>
};