import React from "react";
import {StateManagerProps} from "react-select/dist/declarations/src/stateManager";
import Select, {StylesConfig} from "react-select";

const getStyles = (config: AppSelectConfig) => {
   return {
      option: (provided, state) => ({
         ...provided,
         backgroundColor: state.isSelected ? "lightsteelblue": "white",
         color: "black",
         "&:hover": {
            backgroundColor: "lightsteelblue"
         }
      }),
      control: (base, state) => ({
         ...base,
         width: config?.width ?? "30rem",
         border: '2px solid lightsteelblue',
         // This line disable the blue border
         boxShadow: 'none',
         "&:hover": {
            border: '2px solid lightsteelblue'
         }
      }),
      singleValue: (provided, state) => {
         const opacity = state.isDisabled ? 0.5 : 1;
         const transition = 'opacity 300ms';

         return { ...provided, opacity, transition };
      }
   } as StylesConfig
}

type AppSelectConfig = {
   width?: string;
   height?: string;
}

type AppSelectProps = StateManagerProps & {
   config?: AppSelectConfig;
};

const AppSelect = (props: AppSelectProps) => {
   return (
      <div style={{margin: "1rem"}}>
         <Select styles={getStyles(props.config)} {...props} />
      </div>
   )
}

export default AppSelect;