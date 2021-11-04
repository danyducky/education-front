import React from "react";
import {hasAuth, IAuthProps} from "../../hocs/hasAuth";
import {IUser} from "../../models/IUser";
import {NextPageContext} from "next";

interface IProfileProps {
   user: IUser;
}

const Profile = ({user}: IProfileProps) => {
   return (
      <div>{user.email}</div>
   )
}

export const getServerSideProps = hasAuth((ctx: NextPageContext, props: IAuthProps) => {
   return {
      props
   }
})

export default Profile;