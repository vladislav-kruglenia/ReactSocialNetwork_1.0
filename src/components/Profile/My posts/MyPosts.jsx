import React from 'react';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import s from "./MyPosts.module.css"
import s2 from "../../common/Button.module.css";
import s3 from "../../common/TextareaStyle.module.css"


//import {maxLengthCreator} from "../../../utils/validators/validators";
//import Preloader from "../../common/Preloader/Preloader";
//const maxLength10 = maxLengthCreator(10)

let AddPostForm = (props) => {
    return <form onSubmit={props.handleSubmit} className={s3.addTextForm}>
        <div>
            <Field
                placeholder={"Post message"}
                component={Textarea}
                name={"newPost"}
                validate={[]}
            />
        </div>
        <div>
            <button className={s2.buttonStyle} onClick={props.onClick}>Add post</button>
        </div>
    </form>
}

AddPostForm = reduxForm({form: "addNewPost"})(AddPostForm)


const MyPosts = React.memo(props => {
    if (!props.profilePage.profile) {
        return <></>
    }
    let addNewPost = (formData) => {
        formData = {...formData, id: props.profilePage.posts.length + 1}
        console.log(formData)
        props.addPostCollback(formData)
        props.resetText('addNewPost')
    }

    let postsElements = props.profilePage.posts.slice(0).reverse().map(p => (
        <Post
            key={p.id}
            message={p.message}
            likeCounts={p.likeCounts}
            name={props.profilePage.profile.fullName}
            photo={props.profilePage.profile.photos.small}
        />))

    return (
        <div className={s.myPostsContainer}>
            <div className={s.postsBlock}>
                {/*<h3>My posts</h3>*/}
                <AddPostForm onSubmit={addNewPost}/>
                <div className={s.posts}>
                    {postsElements}
                </div>
            </div>
        </div>
    )
})

export default MyPosts