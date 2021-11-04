import React, {CSSProperties, LegacyRef} from "react";

export type BasicInputProps = {
   innerRef?: LegacyRef<HTMLInputElement>;
   onChange?: (event: React.ChangeEvent) => void
   className?: string;
   style?: CSSProperties;
   type: string;
   placeholder?: string;
   autoComplete?: string;
}

const basic = {
   color: "black",
   fontWeight: "500",
   paddingLeft: "2rem",

   height: "2.5rem",
   width: "17rem",

   border: "0 solid transparent",
   borderRadius: "4px",
   backgroundColor: "#e3e3e3",

   filter: "none",
   outline: "none",
} as unknown as CSSProperties

function AppInput(props: BasicInputProps) {
   return (
      <input
         {...props}
         ref={props.innerRef}
         style={{...basic, ...props.style}}
      />
   )
}

export default AppInput;