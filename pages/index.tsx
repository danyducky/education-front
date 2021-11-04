import React from "react";
import {hasAuth, IAuthProps} from "../hocs/hasAuth";
import {IUser} from "../models/IUser";
import {IModule} from "../models/IModule";
import AppLink from "../components/shared/AppLink";
import Module from "../components/home/Module";
import {NextPageContext} from "next";
import HomeLayout from "../components/HomeLayout";

interface IHomeProps {
   user?: IUser
   modules?: IModule[]
}

/*
   Страница с выбором модуля
 */
const Home = ({user, modules}: IHomeProps) => {
   return (
      <>
         {
            modules.length > 0 ?
               modules.map(module =>
                  <AppLink key={module.id} href={module.route} style={{margin: '1rem'}}>
                     <Module key={module.id} module={module}/>
                  </AppLink>
               )
               :
               <div>Учебные процессы для вас не доступны! Подать заявку в группу можно <AppLink href="/user/request" text="здесь"/></div>
         }
      </>
   )
}

Home.Layout = HomeLayout;

export const getServerSideProps = hasAuth((ctx: NextPageContext, props: IAuthProps) => {
   return {
      props
   }
})

export default Home;