import Hardi from "../../../../img/User.jpg";
import style1 from "../ProfileInfo.module.css";
import style2 from "./ProfileImg.module.css";

import React, {FC} from "react";
import {ProfileImgProps} from "../../Types/ProfileImgTypes";


export const ProfileImg:FC<ProfileImgProps> = (props) => {

    let onMainPhotoSelected = (e:any) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    };
    return <div className={style2.imgContainer}>
        <img src={props.photos.large || Hardi} alt="" className={style1.logo}/>
        {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
    </div>
};