import React, {useEffect, useRef} from "react";
import ClientboardLayout from "../../components/ClientboardLayout";
import {notAuth} from "../../hocs/notAuth";
import {RootState} from "../../redux/store";
import {decrementStep, incrementStep, setPersonData, setUserData} from "../../redux/reducers/registerSlice";
import {connect} from "react-redux";
import RegisterFirstStep from "../../components/clientboard/RegisterFirstStep";
import RegisterSecondStep from "../../components/clientboard/RegisterSecondStep";

const pageTitle = "Регистрация";

const Register = (props) => {
   const previousRef = useRef<HTMLButtonElement>();
   const nextRef = useRef<HTMLButtonElement>();

   return (
      <>
         {
            (() => {
               switch (props.step) {
                  case 1:
                     return <RegisterFirstStep ref={nextRef}/>
                  case 2:
                     return <RegisterSecondStep ref={previousRef}/>
                  default:
                     return <div>Что то пошло не так</div>
               }
            })()
         }
         <div style={{display: 'flex'}}>
            {
               props.step > 1
                  ? <button ref={previousRef} onClick={() => {props.decrementStep()}}>Назад</button>
                  : <button ref={nextRef} onClick={() => {props.incrementStep()}}>Дальше</button>
            }
         </div>
      </>
   )
}

Register.Layout = (props) => ClientboardLayout({...props, title: pageTitle});

export const getServerSideProps = notAuth((ctx) => {
   return {
      props: {}
   }
})

const mapStateToProps = (state: RootState) => {
   return {
      step: state.register.step,
      userData: state.register.userData,
      personData: state.register.personData
   }
}

const mapDispatchToProps = {
   setUserData,
   setPersonData,
   incrementStep,
   decrementStep
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);