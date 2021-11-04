import React from "react";
import {IModule} from "../../models/IModule";
import Radium from "radium";

interface IModuleProps {
   module: IModule;
}

const container = {
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   textAlign: "center",
   border: '2px solid lightsteelblue',
   width: '12rem',
   height: '12rem',

   '@media (max-width: 1200px)': {
      width: '8rem',
      height: '8rem',
   }

} as React.CSSProperties

const container__header = {
   height: '30%',
   fontSize: '1.2em',

   '@media (max-width: 1200px)': {
      fontSize: '0.8em'
   }
} as React.CSSProperties

const container__body = {
   height: '70%'

} as React.CSSProperties

const Module = ({module}: IModuleProps) => {
   return (
      <div style={container}>
         <div style={container__header}>
            {module.shortCaption}
         </div>
         <div style={container__body}>
            Что то ещё
         </div>

      </div>
   )
}

export default Radium(Module);