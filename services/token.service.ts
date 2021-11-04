import {isBrowser} from "../utils/many";

class TokenService {
   static Create() {
      if (isBrowser()) {
         return new TokenService();
      }
      return undefined;
   }

   getLocalAccessToken(): string {
      return localStorage.getItem("accessToken")
   }

   setLocalAccessToken(accessToken: string): void {
      localStorage.setItem("accessToken", accessToken);
   }

   removeLocalAccessToken(): void {
      localStorage.removeItem("accessToken");
   }
}

export default TokenService.Create();