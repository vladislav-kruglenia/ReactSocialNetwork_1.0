import React, {FC} from 'react'
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import style from "./LoginPage.module.css"
import {
    LoginFormOwnProps,
    LoginFormValuesType, LoginFormValuesTypeKeys,
    MapDispatchPropsType,
    MapOwnPropsType,
    MapStatePropsType
} from './LoginPageTypes';
import {AppStateType} from "../../redux/storeRedux";


let LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaURL}) => {
    return <form onSubmit={handleSubmit}>
        {createField<LoginFormValuesTypeKeys>("Email", Input, "email", [required], {type: "text"})}
        {createField<LoginFormValuesTypeKeys>("Password", Input, "password", [required], {type: "password"})}
        {/*{createField(null,"input","rememberMe",[],{type: "checkbox"},"remember me")}*/}
        {captchaURL && <img src={captchaURL} alt={''}/>}
        {captchaURL && createField<LoginFormValuesTypeKeys>("", Input, "captchaURL", [required])}
        {
            error && <div className={style.formSummaryError}>
                {error}
            </div>
        }
        <div>
            <button>Login</button>
        </div>
    </form>
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm);

const LoginPage:FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData:LoginFormValuesType) => {
        console.log(formData);
        props.loginThunkCreator(formData.email, formData.password, formData.rememberMe, formData.captchaURL)
    };
    if (props.isAuth) return <Redirect to={'/profile'}/>;
    return <div className={style.loginForm}>
        <div className={style.loginFormContainer}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaURL={props.captchaURL}/>
        </div>
    </div>
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaURL: state.auth.captchaURL
    }
};


export default connect<MapStatePropsType,
    MapDispatchPropsType,
    MapOwnPropsType,
    AppStateType>(mapStateToProps, {loginThunkCreator})(LoginPage)