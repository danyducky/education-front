import React from "react";
import {hasAuth} from "../../hocs/hasAuth";

const Report = () => {
   return (
      <div>
         Report page
      </div>
   )
}

export const getServerSideProps = hasAuth((context, props) => {
   return {
      props: {}
   }
})

export default Report;