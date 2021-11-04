import React, {CSSProperties, useRef, useState} from "react";
import AppInput from "../shared/AppInput";
import AuthService from "../../services/auth.service"
import LoginModel from "../../models/login.model";
import {useRouter} from "next/router";
import {connect} from "react-redux";
import {setProgressBar} from "../../redux/reducers/appSlice";
import {RootState} from "../../redux/store";
import AppButton from "../shared/AppButton";
import email from "../../public/content/img/email.png";
import password from "../../public/content/img/password.png";

const emailInputStyle = {
   backgroundImage: `url(${email.src})`,
   backgroundRepeat: 'no-repeat',
   backgroundPosition: '6px 8px',
   backgroundSize: '1.5rem'
} as CSSProperties

const passwordInputStyle = {
   backgroundImage: `url(${password.src})`,
   backgroundRepeat: 'no-repeat',
   backgroundPosition: '11px 12px',
   backgroundSize: '0.8rem'
} as CSSProperties

const AuthorizeForm = ({setProgressBar}) => {
   const router = useRouter();

   const emailRef = useRef<HTMLInputElement>();
   const passwordRef = useRef<HTMLInputElement>();
   const [disabled, setDisabled] = useState(false);

   function onSubmit(e) {
      e.preventDefault();
      setProgressBar(true);
      setDisabled(true);
      const model = new LoginModel(emailRef.current?.value, passwordRef.current?.value);
      AuthService.login(model)
         .then(_ => router.push("/"));
   }

   return (
      <form onSubmit={onSubmit} style={{textAlign: 'center'}}>
         <fieldset disabled={disabled}>

            <div style={{display: 'inline-block', height: '2vh', verticalAlign: 'middle'}}>
               {/*Неверный логин или пароль*/}
            </div>

            <p>
               <AppInput
                  innerRef={emailRef}
                  style={emailInputStyle}
                  type="email"
                  placeholder="Введите email"/>
               <br/>
            </p>

            <p>
               <AppInput
                  innerRef={passwordRef}
                  style={passwordInputStyle}
                  type="password"
                  placeholder="Введите пароль"/>
               <br/>
            </p>

            <p>
               <AppButton
                  text="Войти"
               />
            </p>
         </fieldset>
      </form>
   )
}

const mapStateToProps = (state: RootState) => {
   return {}
}

const mapDispatchToProps = {
   setProgressBar
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizeForm);