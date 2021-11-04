import React, {useState} from "react";
import {hasAuth, IAuthProps} from "../../../hocs/hasAuth";
import {NextPageContext} from "next";
import {redirectTo} from "../../../utils/many";
import HomeLayout from "../../../components/HomeLayout";
import client, {serv} from "../../../network/client";
import {RootState} from "../../../redux/store";
import {connect} from "react-redux";
import {setProgressBar} from "../../../redux/reducers/appSlice"
import {ISelectListItem} from "../../../models/ISelectListItem";
import AppSelect from "../../../components/shared/AppSelect";
import {useRouter} from "next/router";
import styles from "../../../styles/user/Request.module.css";
import AppButton from "../../../components/shared/AppButton";
import {ISpeciality} from "../../../models/ISpeciality";
import {IGroup} from "../../../models/IGroup";
import {IGroupRequest} from "../../../models/IGroupRequest";

interface IRequestProps {
   specialities: ISpeciality[];
}

const pageTitle = "Подача заявки в студенческую группу"

const Request = ({specialities}: IRequestProps) => {
   const router = useRouter();

   const [response, setResponse] = useState<string>(null); // request id
   const [speciality, setSpeciality] = useState<ISelectListItem>(null);
   const [group, setGroup] = useState<ISelectListItem>(null);
   const [groups, setGroups] = useState<IGroup[]>([]);

   const onSpecialityChange = (e) => {
      setSpeciality(e);

      client.get<IGroup[]>(`/common/group/specs/${e.value}`)
         .then(r => {
            setGroup(r.data[0] ? {value: r.data[0].id, label: r.data[0].caption} : null)
            setGroups(r.data)
         })
   }

   const onSubmit = (e) => {
      e.preventDefault();
      client.post<string>('/common/request/group', {specialityId: speciality.value, groupId: group.value, comment: ""})
         .then(r => {
            setResponse(r.data)
            setTimeout(() => {
               router.push("/");
            }, 5000)
         })
   }

   return (
      <div className={styles.container}>

         <div className={styles.container__header}>
            {
               response !== null
                  ? <p>Ваша заявка принята! Вы будете перенаправлены на главную страницу через 5 секунд.</p>
                  : null
            }
         </div>

         <div className={styles.container__body}>
            <fieldset disabled={response !== null}>

               <div className={styles.container__body__content}>
                  <AppSelect onChange={onSpecialityChange}
                             placeholder="Выберите специальность"
                             options={
                                specialities.map(x => {
                                   return {value: x.id, label: x.caption} as ISelectListItem
                                })
                             }
                             isSearchable
                  />

                  <AppSelect isDisabled={groups.length === 0}
                             placeholder="Выберите группу"
                             onChange={setGroup}
                             value={group}
                             options={
                                groups?.map(x => {
                                   return {value: x.id, label: x.caption} as ISelectListItem
                                })
                             }
                             isSearchable
                  />
               </div>

               <div className={styles.container__body__button}>
                  <AppButton
                     text="Подать заявку"
                     onClick={onSubmit}
                     isDisabled={speciality === null || group === null || response !== null}
                  />
               </div>
            </fieldset>
         </div>
      </div>
   )
}

Request.Layout = (props) => HomeLayout({...props, title: pageTitle});

export const getServerSideProps = hasAuth(async (ctx: NextPageContext, props: IAuthProps) => {
   const hasStudentModuleAccess = (module) => module.route.startsWith("/student");

   if (props.modules.some(hasStudentModuleAccess)) {
      return redirectTo("/");
   }

   const {accessToken} = props.auth;

   const api = serv(accessToken);

   const request = await api
      .get<IGroupRequest>("/common/request")
      .then(r => r.data)

   if (request) {
      return redirectTo(`/user/request/${request.id}`)
   }

   const specialities = await api
      .get<ISpeciality[]>("/common/speciality")
      .then(r => r.data)

   return {
      props: {...props, specialities}
   }
})

const mapStateToProps = (state: RootState) => {
   return {
      isLoading: state.app.isLoading
   }
}

const mapDispatchToProps = {
   setProgressBar
}

export default connect(mapStateToProps, mapDispatchToProps)(Request);