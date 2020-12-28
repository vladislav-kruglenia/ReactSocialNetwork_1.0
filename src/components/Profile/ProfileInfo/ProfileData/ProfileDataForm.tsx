import React, {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../../common/FormsControls/FormsControls";
import {required} from "../../../../utils/validators/validators";
import style from "../../../LoginPage/LoginPage.module.css";
import s2 from "../../../common/Button.module.css";
import s from "../ProfileInfo.module.css";
import {ProfileType} from "../../../../redux/Types/ProfileReducerTypes";
import {ProfileDataFormOwnProps, ProfileDataValuesTypeKeys} from "../../Types/ProfileDataFormTypes";

const ProfileDataForm: FC<InjectedFormProps<ProfileType, ProfileDataFormOwnProps> & ProfileDataFormOwnProps> =
    ({handleSubmit, exitToEditPage, profile, error}) => {
        return (
            <>
                <button className={s2.buttonStyle} onClick={exitToEditPage}>Exit</button>
                <form onSubmit={handleSubmit}>
                    <div className={s.contact}>
                        <div><b>My name: </b></div>
                        <div>{createField<ProfileDataValuesTypeKeys>(
                            "My name",
                            Input,
                            "fullName",
                            [required])}</div>
                        {/*{createField('My name', Input, "fullName", {},{},"")}*/}
                    </div>
                    <div className={s.contact}>
                        <div><b>Looking for a job: </b></div>
                        <div>{createField<ProfileDataValuesTypeKeys>(
                            "", Input,
                            "lookingForAJob",
                            [],
                            {type: "checkbox"})}</div>
                    </div>
                    <div className={s.contact}>
                        <div><b>Description:</b></div>
                        <div>{createField<ProfileDataValuesTypeKeys>(
                            "About me",
                            Textarea,
                            "lookingForAJobDescription",
                            [required])}</div>
                    </div>
                    <div className={s.contact}>
                        <div><b>About me:</b></div>
                        <div>{createField<ProfileDataValuesTypeKeys>(
                            "About me",
                            Textarea,
                            "aboutMe", [required])}</div>
                    </div>
                    <div>
                        <b>My contacts: </b>
                        {Object.keys(profile.contacts).map(p => {
                            return <div key={p} className={s.contact}>
                                <div><i>{p}</i></div>
                                <div>
                                    {
                                        // TODO: исправить ошибку с типизацией вложенного массива
                                        // @ts-ignore
                                        createField(p, Input, "contacts." + p)
                                    }
                                </div>
                            </div>
                        })}
                    </div>
                    {
                        error && <div className={style.formSummaryError}>
                            {error}
                        </div>
                    }
                    <div>
                        <button className={s2.buttonStyle}>Save</button>
                    </div>

                </form>
            </>
        )
    };
const ProfileDataFormContainer = reduxForm<ProfileType,
    ProfileDataFormOwnProps>({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormContainer