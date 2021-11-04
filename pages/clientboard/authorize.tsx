import React from "react";
import AuthorizeForm from "../../components/clientboard/AuthorizeForm";
import ClientboardLayout from "../../components/ClientboardLayout";
import {notAuth} from "../../hocs/notAuth";
import AppLink from "../../components/shared/AppLink";

const pageTitle = "Вход";

const Authorize = (props) => {
   return (
      <div>
         <AuthorizeForm/>
         <div style={{textAlign: 'center'}}>
            Ещё нет аккаунта? <AppLink text="Регистрация" href="/clientboard/register"
                                       style={{textDecoration: 'underline'}}/>
         </div>
      </div>
   )
}

Authorize.Layout = (props) => ClientboardLayout({...props, title: pageTitle});

export const getServerSideProps = notAuth((ctx) => {
   return {
      props: {}
   }
})

export default Authorize;