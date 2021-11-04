import React, {useEffect} from "react";
import AppInput from "../shared/AppInput";
import AppLink from "../shared/AppLink";

const RegisterFirstStep = (props, ref: React.MutableRefObject<HTMLButtonElement>) => {

   useEffect(() => {
      ref.current.addEventListener("click", () => {
         console.log('clicked')
      })
   }, [ref])

   return (
      <div style={{
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         width: '100%',
         height: '100%'
      }}>

         <form autoComplete="off">
            <AppInput autoComplete="new-email" type="email" placeholder="Введите email"/>
            <AppInput autoComplete="new-password" type="password" placeholder="Введите пароль"/>
            <AppInput autoComplete="new-password" type="password" placeholder="Повторите пароль"/>
         </form>
         
      </div>
   )
}

export default React.forwardRef(RegisterFirstStep);