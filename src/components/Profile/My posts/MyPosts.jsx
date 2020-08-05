import React from 'react';
import s from "./MyPosts.module.css"
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";



const maxLength10 =  maxLengthCreator(10)

let AddPostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field
                placeholder={"Post message"}
                component={Textarea}
                name={"newPost"}
                validate={[required, maxLength10]}
            />
        </div>
        <div>
            <button onClick={props.onClick}>Add post</button>
        </div>
    </form>
}

AddPostForm = reduxForm({form: "addNewPost"})(AddPostForm)


const MyPosts = React.memo(props => {
    let addNewPost = (formData) =>{
        console.log(formData)
        props.addPostCollback(formData.newPost)
    }

    let postsElements = props.profilePage.posts.map(p => <Post message={p.message} likeCounts={p.likeCounts}/>)

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={addNewPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

export default MyPosts