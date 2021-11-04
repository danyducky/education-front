import '../styles/globals.css'
import Head from "next/head";
import React from "react";
import {NextPage} from "next";
import {IUser} from "../models/IUser";
import {Provider} from "react-redux";
import store from "../redux/store";
import {StyleRoot} from "radium";
import Application from "../providers/Application";

export type LayoutProps = {
   children: React.ReactNode;
   user?: IUser;
   title?: string;
}

export type Page = NextPage<any> & {
   Layout?: React.FC<LayoutProps>
}

interface IAppProps {
   Component: Page,
   pageProps: any,
   user?: IUser
}

const MyApp = ({Component, pageProps}: IAppProps) => {
   const Layout = Component.Layout ?? (props => <>{props.children}</>);

   return (
      <>
         <Head>
            <title>УГК: Приложение</title>
         </Head>

         <Provider store={store}>
            <StyleRoot>
               <Application>
                  <Layout {...pageProps}>
                     <Component {...pageProps}/>
                  </Layout>
               </Application>
            </StyleRoot>
         </Provider>
      </>
   )
}

export default MyApp;
