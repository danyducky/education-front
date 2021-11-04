import {IUser} from "../models/IUser";
import axios from "axios";
import {NextPageContext} from "next";
import TokenService from "../services/token.service"
import {isServer} from "../utils/many";
import {IModule} from "../models/IModule";

export enum CurrentStatus {
   SIGNED_IN = "SIGNED_IN",
   SIGNED_OUT = "SIGNED_OUT"
}

export interface IAppStatusResponse {
   status: CurrentStatus;
   accessToken?: string;
}

/*
Обновление токена, если кука валидна
 */
export const getAuth = async (ctx: NextPageContext): Promise<IAppStatusResponse> => {
   const server = isServer();
   return await axios.post<string>('/auth/token/refresh', null, {
      baseURL: process.env.apiUrl,
      headers: server
         ? {cookie: ctx.req.headers.cookie}
         : undefined,
      withCredentials: true
   })
      .then(response => {
         if (server) {
            ctx.res.setHeader("set-cookie", response.headers["set-cookie"]);
         } else {
            TokenService.setLocalAccessToken(response.data);
         }
         return {status: CurrentStatus.SIGNED_IN, accessToken: response.data} as IAppStatusResponse
      })
      .catch((error) => {
         return {status: CurrentStatus.SIGNED_OUT} as IAppStatusResponse
      });
}

export const getUser = async (ctx: NextPageContext, auth: IAppStatusResponse): Promise<IUser | null> => {
   const server = isServer();
   return await axios.get<IUser | null>('/auth/profile/getme', {
      baseURL: process.env.apiUrl,
      headers: server
         ? {cookie: ctx.req.headers.cookie, authorization: `Bearer ${auth.accessToken}`}
         : {authorization: `Bearer ${TokenService.getLocalAccessToken()}`},
      withCredentials: true
   })
      .then(response => response.data)
      .catch(_ => null);
}

export const getAvailableModules = async (ctx: NextPageContext, auth: IAppStatusResponse): Promise<IModule[]> => {
   const server = isServer();
   return await axios.get<IModule[]>('/auth/module/available', {
      baseURL: process.env.apiUrl,
      headers: server
         ? {cookie: ctx.req.headers.cookie, authorization: `Bearer ${auth.accessToken}`}
         : {authorization: `Bearer ${TokenService.getLocalAccessToken()}`},
      withCredentials: true
   })
      .then(response => response.data)
      .catch(_ => null);
}