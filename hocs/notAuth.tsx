import React from "react";
import {CurrentStatus, getAuth} from "../services/_app.service";
import {redirectTo} from "../utils/many";

export const notAuth = (gssp) => async (ctx) => {
   const auth = await getAuth(ctx);
   if (auth.status === CurrentStatus.SIGNED_IN)
      return redirectTo("/")

   return await gssp(ctx);
}

