export default class RegisterModel {
    readonly email: string;
    readonly password: string;
    readonly firstname: string;
    readonly surname: string;
    readonly patronymic: string;
    readonly birthDate: Date;

    constructor(email: string, password: string, firstname: string, surname: string, patronymic: string, birthDate: Date) {
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.surname = surname;
        this.patronymic = patronymic;
        this.birthDate = birthDate;
    }
}