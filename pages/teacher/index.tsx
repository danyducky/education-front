import React from "react";
import {hasAuth} from "../../hocs/hasAuth";

const Teacher = () => {
   return (
      <div>
         Teacher page!
      </div>
   )
}

export const getServerSideProps = hasAuth((context, props) => {
   return {
      props: {}
   }
})

export default Teacher;