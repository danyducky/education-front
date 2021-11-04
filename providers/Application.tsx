import React, {useEffect} from "react";
import {connect} from "react-redux";
import {useRouter} from "next/router";
import {setProgressBar} from "../redux/reducers/appSlice";
import NextNProgress from "nextjs-progressbar";
import {RootState} from "../redux/store";

type IAppProviderProps = {
   children?: React.ReactNode;
} & any

const Application = ({children, isLoading, setProgressBar}: IAppProviderProps) => {
   const router = useRouter();

   useEffect(() => {
      router.events.on('routeChangeStart', () => setProgressBar(true));
      router.events.on('routeChangeComplete', () => setProgressBar(false));
      router.events.on('routeChangeError', () => setProgressBar(false));

      return () => {
         router.events.off('routeChangeStart', () => setProgressBar(true));
         router.events.off('routeChangeComplete', () => setProgressBar(false));
         router.events.off('routeChangeError', () => setProgressBar(false));
      }
   }, [router])

   return (
      <>
         {
            isLoading
               ? <NextNProgress
                     color="#29d"
                     showOnShallow={true}
                     startPosition={0.3}
                     stopDelayMs={300}
                     height={6}
                     options={{ easing: "ease", speed: 500 }}/>
               : null
         }
         {children}
      </>
   )
}

const mapStateToProps = (state: RootState) => {
   return {
      isLoading: state.app.isLoading
   }
}

const mapDispatchToProps = {
   setProgressBar
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
