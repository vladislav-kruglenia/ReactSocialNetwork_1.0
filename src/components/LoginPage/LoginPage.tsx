import React, {FC} from 'react'
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {loginThunkCreator} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";
import style from "./LoginPage.module.css"
import {LoginFormOwnProps, LoginFormValuesType, LoginFormValuesTypeKeys} from './LoginPageTypes';
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

export const LoginPage:FC = () => {

    const isAuth = useSelector((state:AppStateType) => state.auth.isAuth);
    const captchaURL = useSelector((state:AppStateType) => state.auth.captchaURL);
    const dispatch = useDispatch();

    const onSubmit = (formData:LoginFormValuesType) => {
        console.log(formData);
        dispatch(loginThunkCreator(formData.email, formData.password, formData.rememberMe, formData.captchaURL))
    };
    if (isAuth) return <Redirect to={'/profile'}/>;
    return <div className={style.loginForm}>
        <div className={style.loginFormContainer}>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaURL={captchaURL}/>
        </div>
    </div>
};
