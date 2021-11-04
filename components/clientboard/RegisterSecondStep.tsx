import React, {useEffect} from "react";


const RegisterSecondStep = (props, ref) => {

   useEffect(() => {

      ref.current.addEventListener("click", () => {
         console.log('previous clicked')
      })
   }, [ref])
   return (
      <div>Шаг 2</div>
   )
}

export default React.forwardRef(RegisterSecondStep);