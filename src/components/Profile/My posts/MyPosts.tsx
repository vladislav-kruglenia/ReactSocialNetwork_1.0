import React, {FC} from 'react';
import Post from "./Post/Post";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../../common/FormsControls/FormsControls";
import s from "./MyPosts.module.css"
import s2 from "../../common/Button.module.css";
import s3 from "../../common/TextareaStyle.module.css"
import {
    AddNewPostFormData,
    AddNewPostFormValuesTypeKeys,
    AddNewPostOwnPropsType,
    MyPostsPropsType
} from "../Types/MyPostsTypes";


//import {maxLengthCreator} from "../../../utils/validators/validators";
//import Preloader from "../../common/Preloader/Preloader";
//const maxLength10 = maxLengthCreator(10)

let AddPostForm: FC<InjectedFormProps<AddNewPostFormData, AddNewPostOwnPropsType> & AddNewPostOwnPropsType> = (props) => {
    return <form onSubmit={props.handleSubmit} className={s3.addTextForm}>
        <div>
            {createField<AddNewPostFormValuesTypeKeys>(
                "Post message",
                Textarea,
                "newPost",
                [],
                {type: "text"}
            )}
            {/*<Field
                placeholder={"Post message"}
                component={Textarea}
                name={"newPost"}
                validate={[]}
            />*/}
        </div>
        <div>
            <button className={s2.buttonStyle}>Add post</button>
        </div>
    </form>
};

const AddPostReduxForm = reduxForm<AddNewPostFormData, AddNewPostOwnPropsType>({form: "addNewPost"})(AddPostForm);

// React.memo - HOC для повышения производ-ти, автоматически сравнивает приходящие пропсы
const MyPosts: FC<MyPostsPropsType> = React.memo(props => {
    if (!props.profilePage.profile) {
        return <></>
    }
    let addNewPost = (formData: AddNewPostFormData) => {
        formData = {...formData, id: props.profilePage.posts.length + 1};
        console.log(formData);
        props.addPostCollback(formData);
        props.resetText('addNewPost')
    };

    let postsElements = props.profilePage.posts.slice(0).reverse().map(p => (
        <Post
            key={p.id}
            message={p.message}
            name={props.profilePage.profile && props.profilePage.profile.fullName}
            photo={(props.profilePage.profile && props.profilePage.profile.photos) && props.profilePage.profile.photos.small}
        />));

    return (
        <div className={s.myPostsContainer}>
            <div className={s.postsBlock}>
                {/*<h3>My posts</h3>*/}
                <AddPostReduxForm onSubmit={addNewPost}/>
                <div className={s.posts}>
                    {postsElements}
                </div>
            </div>
        </div>
    )
});

export default MyPosts