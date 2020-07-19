import React from 'react';
import s from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import Hardi from "./../../../img/User.jpg"
import ProfileStatus from "./ProfileStatus/ProfileStatus";

const ProfileInfo = (props) => {
    if(!props.profile){
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                {!props.profile.photos.small
                    ?<img src={Hardi} alt="" className={s.logo}/>
                    :<img src={props.profile.photos.large} alt=""/>}
                 <ProfileStatus
                     status={props.status}
                     updateStatus={props.updateStatus}
                 />
            </div>
        </div>
    )
}

export default ProfileInfo