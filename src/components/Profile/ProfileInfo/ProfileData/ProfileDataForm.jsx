import Contact from "../Contact/Contact";
import React from "react";
import {reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../../common/FormsControls/FormsControls";
import {required} from "../../../../utils/validators/validators";
import style from "../../../LoginPage/LoginPage.module.css";

const ProfileDataForm = ({handleSubmit,exitToEditPage,profile,error}) => {
    return (
        <>
            <button onClick={exitToEditPage}>Exit</button>
            <form onSubmit={handleSubmit}>
                <div>
                    <b>My name: </b>
                    {createField("My name", Input, "fullName", [required])}
                    {/*{createField('My name', Input, "fullName", {},{},"")}*/}
                </div>
                <div>
                    <b>Looking for a job: </b>
                    {createField("", Input, "lookingForAJob", null, {type: "checkbox"})}
                </div>
                <div>
                    <b>Description:</b>
                    {createField("About me", Textarea, "lookingForAJobDescription", [required])}
                </div>
                <div>
                    <b>About me:</b>
                    {createField("About me", Textarea, "aboutMe", [required])}
                </div>
                 <div>
                     <b>My contacts: </b>
                     {Object.keys(profile.contacts).map(key => {
                    return <div>
                        <i>{key}</i>{createField(key, Input, "contacts." + key)}
                    </div>
                })}
                 </div>
                {
                    error && <div className={style.formSummaryError}>
                        {error}
                    </div>
                }
                <div>
                    <button>Save</button>
                </div>

            </form>
        </>
    )
}
const ProfileDataFormContainer = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormContainer