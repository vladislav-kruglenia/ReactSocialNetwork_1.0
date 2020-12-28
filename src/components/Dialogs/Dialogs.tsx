import React, {FC} from "react";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {createField, Textarea} from "../common/FormsControls/FormsControls";
import s from "./Dialogs.module.css"
import s2 from "../../components/common/TextareaStyle.module.css"
import s3 from "../../components/common/Button.module.css"
import {
    AddMessageFormDataType,
    AddMessageFormValuesTypeKeys,
    DialogsPropsType,
    OwnFormPropsType
} from "./Types/DialogsTypes";



const maxLength10 = maxLengthCreator(10);


let AddMessageForm: FC<InjectedFormProps<AddMessageFormDataType, OwnFormPropsType> & OwnFormPropsType> = (props) => {
    return <form onSubmit={props.handleSubmit} className={`${s2.addTextForm} ${s.addMessageForm}`}>
        {createField<AddMessageFormValuesTypeKeys>(
            "Add message",
            Textarea,
            "newMessage",
            [required, maxLength10],
            {type: "text"}
        )}
        <button className={s3.buttonStyle}>Send</button>
    </form>;
};

const AddMessageReduxForm = reduxForm<AddMessageFormDataType>({form: "addNewMessage"})(AddMessageForm);


const Dialogs: FC<DialogsPropsType> = (props) => {

    let addNewMessage = (formData: AddMessageFormDataType) => {
        console.log(formData);
        props.addMessageCollBack(formData.newMessage);
        props.resetText("addNewMessage")
    };

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>);
    let messagesElements = props.dialogsPage.messages.map(m => <Message key={m.message} message={m.message}/>);

    if (!props.isAuth) return <Redirect to={'/login'}/>;

    return (
        <div className={s.dialogsContainer}>
            <div className={s.dialogsItemsContainer}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
            </div>
            <div className={s.messagesContainer}>
                <div className={s.messagesWindowContainer}>
                    {messagesElements}
                </div>
                <AddMessageReduxForm onSubmit={addNewMessage}/>
            </div>

        </div>
    )
};


export default Dialogs