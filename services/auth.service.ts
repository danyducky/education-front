import tokenService from "./token.service";

import RegisterModel from "../models/register.model";
import LoginModel from "../models/login.model";

import client from "../network/client";

interface registerResponse {
    userId: string;
}

class AuthService {
    login(loginModel: LoginModel) {
        return client.post<string>("/auth/auth/login", loginModel)
            .then(response => {
                if (response.data) {
                    tokenService.setLocalAccessToken(response.data);
                }

                return response.data;
            })
    }

    logout() {
        return client.post("/auth/auth/logout")
            .then(response => tokenService.removeLocalAccessToken());
    }

    register(registerModel: RegisterModel) {
        return client.post<registerResponse>("/auth/student", registerModel)
            .then(response => response.data.userId);
    }
}

export default new AuthService();