import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./My posts/MyPostsContainer";
import s from "./Profile.module.css"




const Profile = (props) => {

    return (
        <div className={s.profileMain}>
            <ProfileInfo
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
                saveProfileData={props.saveProfileData}
            />
            <MyPostsContainer
                isOwner={props.isOwner}
            />
        </div>
    )
}

export default Profile