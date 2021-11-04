import React from "react";
import styles from "../styles/HomeLayout.module.css";
import AppLink from "./shared/AppLink";
import {LayoutProps} from "../pages/_app";
import {useRouter} from "next/router";
import AuthService from "../services/auth.service";

const HomeLayout = ({children, user, title}: LayoutProps) => {
   const router = useRouter();

   const onLogoutClick = (e) => {
      e.preventDefault();
      AuthService.logout()
         .then(_ => router.push("/clientboard"))
   }

   return (
      <div className={styles.container}>
         <div className={styles.container__header__wrapper}>
            <button onClick={() => router.back()} className={styles.button__back}>Назад</button>

            <div className={styles.container__header}>
               <div>
                  <AppLink href="/profile" text={user?.email} />
               </div>
               <div>
                  <input type="button" value="Выйти" onClick={onLogoutClick} />
               </div>
            </div>
         </div>

         <div className={styles.container__body}>
            <div className={styles.container__body__header}>
               {title ? <p>{title}</p> : null}
            </div>
            <div className={styles.container__body__content}>
               {children}
            </div>
         </div>

         <div className={styles.container__footer}>
            <AppLink href="https://vk.com/danyducky" options={{target: "_blank"}}>
               <div>© danyducky</div>
            </AppLink>
         </div>
      </div>
   )
}

export default HomeLayout;