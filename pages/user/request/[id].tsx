import React from "react";
import {hasAuth, IAuthProps} from "../../../hocs/hasAuth";
import {NextPageContext} from "next";
import {redirectTo} from "../../../utils/many";
import {serv} from "../../../network/client";
import {IGroupRequest} from "../../../models/IGroupRequest";
import HomeLayout from "../../../components/HomeLayout";
import {IGroup} from "../../../models/IGroup";
import {ISpeciality} from "../../../models/ISpeciality";
import {IUser} from "../../../models/IUser";
import AppButton from "../../../components/shared/AppButton";
import AppLink from "../../../components/shared/AppLink";
import styles from "../../../styles/user/RequestById.module.css";

interface IRequestByIdProps {
   request: IGroupRequest;
   group: IGroup;
   speciality: ISpeciality;
   user: IUser;
}

const pageTitle = "Текущая заявка в студенческую группу"

const RequestById = ({request, group, speciality, user}: IRequestByIdProps) => {
   return (
      <div className={styles.container}>
         <div className={styles.container__content}>

            <div className={styles.primary}>{user.surname} {user.firstname} {user.patronymic}</div>

            <div className={styles.info__block}>
               <div>
                  Дата рождения: {new Date(user.birthDate).toLocaleDateString()}
               </div>

               <div>
                  Целевая группа: {group.caption}
               </div>
               <div>
                  Специальность: {speciality.caption}
               </div>

               <div>
                  Время обучения: {speciality.yearsToStudy} год(а) {speciality.monthsToStudy} месяцев
               </div>
            </div>


            {request.comment
               ? <div>Ваш комментарий: {request.comment}</div>
               : null
            }

            <div className={styles.button}>
               <AppLink href="/">
                  <AppButton text="Хорошо!" />
               </AppLink>
            </div>

         </div>
      </div>
   )
}

RequestById.Layout = (props) => HomeLayout({...props, title: pageTitle});

export const getServerSideProps = hasAuth(async (ctx: NextPageContext, props: IAuthProps) => {
   const hasStudentModuleAccess = (module) => module.route.startsWith("/student");

   if (props.modules.some(hasStudentModuleAccess)) {
      return redirectTo("/");
   }

   const {accessToken} = props.auth;

   const api = serv(accessToken);

   const request = await api
      .get<IGroupRequest>("/common/request")
      .then(r => r.data);

   if (!request)
      return redirectTo("/user/request");

   const group = await api
      .get<IGroup>(`/common/group/${request.groupId}`)
      .then(r => r.data)

   const speciality = await api
      .get<ISpeciality>(`/common/speciality/${group.specialityId}`)
      .then(r => r.data)

   return {
      props: {...props, request, group, speciality}
   }
})

export default RequestById;