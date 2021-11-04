import React from "react";
import styles from "../styles/ClientboardLayout.module.css";
import {LayoutProps} from "../pages/_app";

const ClientboardLayout = ({children, title}: LayoutProps) => {
   return (
      <div className={styles.container}>
         <div className={styles.window}>
            <div className={styles.window__container}>
               <div className={styles.window__header}>
                  <div className={styles.window__header__inner}>
                     <span>{title ? title : 'Заголовок'}</span>
                  </div>
               </div>
               <div className={styles.window__content}>
                  {children}
               </div>
            </div>
         </div>
      </div>
   )
}

export default ClientboardLayout;