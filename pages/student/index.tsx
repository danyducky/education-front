import React from "react";
import Layout from "../../components/Layout";
import {hasAuth, IAuthProps} from "../../hocs/hasAuth";
import {NextPageContext} from "next";

const Student = () => {
   return (
      <div>Student index page</div>
   )
}

Student.Layout = Layout;

export const getServerSideProps = hasAuth((ctx: NextPageContext, props: IAuthProps) => {
   return {
      props
   }
})

export default Student;