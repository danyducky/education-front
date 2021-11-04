import React from "react";
import {CurrentStatus, getAuth, getAvailableModules, getUser, IAppStatusResponse} from "../services/_app.service";
import {redirectTo} from "../utils/many";
import {IModule} from "../models/IModule";
import {IUser} from "../models/IUser";

const moduleUrlList = (process.env.moduleUrls as unknown as []);

export interface IAuthProps {
   modules?: IModule[];
   auth: IAppStatusResponse;
   user: IUser;
}

export const hasAuth = (gssp) => async (ctx) => {
   const {resolvedUrl} = ctx;
   const auth = await getAuth(ctx);
   if (auth.status === CurrentStatus.SIGNED_OUT)
      return redirectTo("/clientboard/authorize")

   const user = await getUser(ctx, auth);
   const modules = await getAvailableModules(ctx, auth);
   const routes = modules?.map(module => module.route);

   const isPathDenied = (url) => {
      if (resolvedUrl.startsWith(url)) {
         if (!routes.includes(url)) {
            return true;
         }
      }
      return false;
   };
   if (moduleUrlList.some(isPathDenied))
      return redirectTo("/");

   const props = {
      modules,
      auth,
      user
   } as IAuthProps

   return await gssp(ctx, props);
}

