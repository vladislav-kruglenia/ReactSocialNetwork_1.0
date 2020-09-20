import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Textarea} from "../common/FormsControls/FormsControls";
import s from "./Dialogs.module.css"
import s2 from "../../components/common/TextareaStyle.module.css"
import s3 from "../../components/common/Button.module.css"


const maxLength10 = maxLengthCreator(10)


let AddMessageForm = (props) => {
    return <form onSubmit={props.handleSubmit} className={`${s2.addTextForm} ${s.addMessageForm}`}>
        <Field
            placeholder={"Add message"}
            component={Textarea}
            name={"newMessage"}
            validate={[required, maxLength10]}
        />
        <button className={s3.buttonStyle}>Send</button>
    </form>;
}

AddMessageForm = reduxForm({form: "addNewMessage"})(AddMessageForm)

const Dialogs = (props) => {

    /*let onMessageChange = () => {
        props.onMessageChangeCollBack(newMessageElement.current.value)
    }*/

    let addNewMessage = (formData) => {
        console.log(formData)
        props.addMessageCollBack(formData.newMessage)
        props.resetText("addNewMessage")
    }

    /*let addMessage = () => {
        props.addMessageCollBack()
    }*/

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElements = props.dialogsPage.messages.map(m => <Message key={m.message} message={m.message}/>)

    if (!props.isAuth) return <Redirect to={'/login'}/>

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
                <AddMessageForm onSubmit={addNewMessage}/>
            </div>

        </div>
    )
}


export default Dialogs