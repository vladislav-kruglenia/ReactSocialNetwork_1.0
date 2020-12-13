import React, {FC} from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./My posts/MyPostsContainer";
import s from "./Profile.module.css"
import {ProfilePropsTypes} from "./Types/ProfileTypes";

const Profile:FC<ProfilePropsTypes> = (props) => {
    return (
        <div className={s.profileMain}>
            <ProfileInfo
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                // @ts-ignore
                savePhoto={props.savePhoto}
                saveProfileData={props.saveProfileData}
            />
            <MyPostsContainer/>
        </div>
    )
};

export default Profile