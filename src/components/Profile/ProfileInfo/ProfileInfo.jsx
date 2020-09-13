import React, {useState} from 'react';
import s from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import Hardi from "./../../../img/User.jpg"
import ProfileStatusWidthHooks from "./ProfileStatus/ProfileStatusWidthHooks";
import Contact from "./Contact/Contact";
import ProfileDataForm from "./ProfileData/ProfileDataForm";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    let [editMode, setEditMode] = useState(false)
    let formDataEdit = (formData) => {
        console.log(formData)
        props.saveProfileData(formData)
            .then(() => {
                setEditMode(false)
            })
        //setEditMode(false)
    }
    return (
        <div className={s.descriptionBlock}>
            <ProfileImg {...props}/>
            <ProfileStatusWidthHooks
                status={props.status}
                updateStatus={props.updateStatus}
            />
            {editMode
                ? <ProfileDataForm
                    onSubmit={formDataEdit}
                    initialValues={props.profile}
                    profile={props.profile}
                    exitToEditPage={() => {
                        setEditMode(false)
                    }}/>
                : <ProfileData profile={props.profile} goToEditPage={() => {
                    setEditMode(true)
                }}/>}
        </div>
    )
}
const ProfileData = (props) => {
    return (
        <>
            <button onClick={props.goToEditPage}>Edit</button>
            <div>
                <b>My name: </b>{props.profile.fullName}
            </div>
            <div>
                <b>Looking for a job: </b>
                {props.profile.lookingForAJob
                    ? `yes \n ${props.profile.lookingForAJobDescription}`
                    : "no"}
            </div>
            <div>
                <b>My contacts: </b><br/>
                {Object.keys(props.profile.contacts).map(key => {
                    return <Contact key={key} contactName={key} contactValue={props.profile.contacts[key]}/>
                })}
            </div>
        </>
    )
}


const ProfileImg = (props) => {
    let onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return <>
        <img src={props.profile.photos.large || Hardi} alt="" className={s.logo}/>
        {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
    </>
}
export default ProfileInfo