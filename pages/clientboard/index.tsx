import React from "react";
import AppLink from "../../components/shared/AppLink";
import ClientboardLayout from "../../components/ClientboardLayout";
import {notAuth} from "../../hocs/notAuth";
import {redirectTo} from "../../utils/many";

const Clientboard = (props) => {
   return (
      <div>
         Выберите:
         <AppLink href="/clientboard/authorize" text="Авторизация"/>
      </div>
   )
}

Clientboard.Layout = ClientboardLayout;

export const getServerSideProps = notAuth((ctx) => {
   return redirectTo("/clientboard/authorize")

   return {
      props: {}
   }
})



export default Clientboard;