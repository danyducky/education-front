import React from "react";
import {LayoutProps} from "../pages/_app";
import styles from "../styles/Layout.module.css";
import client from "../network/client";
import {useRouter} from "next/router";
import TokenService from "../services/token.service"
import {setProgressBar} from "../redux/reducers/appSlice";
import {connect} from "react-redux";
import {RootState} from "../redux/store";

type DefaultLayoutProps = LayoutProps & any;

const Layout = ({children, user, setProgressBar}: DefaultLayoutProps) => {
   const router = useRouter();

   const onLogoutClick = (e) => {
      e.preventDefault();
      setProgressBar(true);
      client.post("/auth/auth/logout")
         .then(_ => {
            TokenService.removeLocalAccessToken();
            router.push("/clientboard")
         })
   }

   return (
      <div className={styles.container}>
         <div className={styles.container__header__wrapper}>
            <div className={styles.container__header}>
               <div className={styles.container__header__top}>

                  <div>
                     {user?.email}
                  </div>

                  <div>
                     <input type="button" value="logout" onClick={onLogoutClick}/>
                  </div>

               </div>

               <div className={styles.container__header__bottom}>
                  bottom
               </div>
            </div>
         </div>
         <div className={styles.container__body__wrapper}>
            <div className={styles.container__body}>
               {children}
            </div>
         </div>
         <div className={styles.container__footer}>

         </div>
      </div>
   )
}

const mapStateToProps = (state: RootState) => {
   return {}
}

const mapDispatchToProps = {
   setProgressBar
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);