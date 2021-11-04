import React, {CSSProperties, MouseEventHandler} from "react";
import styles from "../../styles/shared/AppButton.module.css"

type AppButtonProps = {
   text: string;
   style?: CSSProperties;
   isDisabled?: boolean;
   onClick?: MouseEventHandler<HTMLInputElement>;
}

const AppButton = ({text, style, isDisabled, onClick}: AppButtonProps) => {
   const buttonClass = isDisabled ? styles.button__disabled : styles.button;
   return (
      <button
         disabled={isDisabled}
         onClick={onClick}
         className={buttonClass}
         style={style}
      >{text}</button>
   )
}

export default AppButton;