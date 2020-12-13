import React, {FC, useState} from 'react';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWidthHooks from "./ProfileStatus/ProfileStatusWidthHooks";
import Contact from "./Contact/Contact";
import ProfileDataForm from "./ProfileData/ProfileDataForm";
import {ProfileImg} from "./ProfileImg/ProfileImg";
import s from "./ProfileInfo.module.css"
import s2 from "../../common/Button.module.css";
import {ProfileDataPropsType, ProfileInfoPropsType} from "../Types/ProfileInfoTypes";
import {ProfileType} from "../../../redux/Types/ProfileReducerTypes";

const ProfileInfo: FC<ProfileInfoPropsType> = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    let [editMode, setEditMode] = useState(false);
    let formDataEdit = (formData: ProfileType) => {
        console.log(formData);
        props.saveProfileData(formData)
            .then(() => {
                setEditMode(false)
            })
        //setEditMode(false)
    };
    return (
        <div className={s.profileInfoContainer}>
            <ProfileImg
                // @ts-ignore
                photos={props.profile.photos || null}
                isOwner={props.isOwner}
                // @ts-ignore
                savePhoto={props.savePhoto}
            />
            <div className={s.descriptionBlock}>
                <ProfileStatusWidthHooks
                    status={props.status}
                    updateStatus={props.updateStatus}
                    nameUser={props.profile.fullName}
                    isOwner={props.isOwner}
                />
                {editMode
                    ? <ProfileDataForm
                        // @ts-ignore
                        onSubmit={formDataEdit}
                        initialValues={props.profile}
                        profile={props.profile}
                        exitToEditPage={() => {
                            setEditMode(false)
                        }}/>
                    : <ProfileData
                        // @ts-ignore
                        isOwner={props.isOwner}
                        profile={props.profile}
                        // @ts-ignore
                        goToEditPage={() => {
                            setEditMode(true)
                        }}
                    />}
            </div>
        </div>
    )
};

const ProfileData: FC<ProfileDataPropsType> = (props) => {
    return (
        <div className={s.contactsDataContainer}>
            <div className={s.contact}>
                <div><b>Looking for a job: </b></div>
                <div>
                    {props.profile.lookingForAJob
                        ? "yes"
                        : "no"}
                </div>
            </div>
            <div className={s.contact}>
                <div><b>My skills: </b></div>
                <div>
                    {props.profile.lookingForAJobDescription}
                </div>
            </div>
            <div>
                <b>My contacts: </b><br/>
                {Object.keys(props.profile.contacts).map(key => {
                    // @ts-ignore
                    return <Contact key={key} contactName={key} contactValue={props.profile.contacts[key]}/>
                })}
            </div>
            {props.isOwner && <button onClick={props.goToEditPage} className={s2.buttonStyle}>Edit</button>}

        </div>
    )
};

export default ProfileInfo