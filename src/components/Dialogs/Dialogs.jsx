import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import s from "./Dialogs.module.css"
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Textarea} from "../common/FormsControls/FormsControls";


const maxLength10 =  maxLengthCreator(10)


let AddMessageForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field
            placeholder={"Add message"}
            component={Textarea}
            name={"newMessage"}
            validate={[required, maxLength10]}
        />
        <button>Send</button>
    </form>;
}

AddMessageForm = reduxForm({form: "addNewMessage"})(AddMessageForm)

const Dialogs = (props) => {

    /*let onMessageChange = () => {
        props.onMessageChangeCollBack(newMessageElement.current.value)
    }*/

    let addNewMessage = (formData) =>{
        console.log(formData)
        props.addMessageCollBack(formData.newMessage)
    }

    /*let addMessage = () => {
        props.addMessageCollBack()
    }*/

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message}/>)

    if (!props.isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <AddMessageForm onSubmit={addNewMessage}/>
            </div>

        </div>
    )
}


export default Dialogs