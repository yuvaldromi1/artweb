export type Role = "User" | "Admin";

export class UserModel {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public role!: Role;
    public roleId!: number; // 1 = Admin, 2 = User

    public captchaToken!: string; // ReCAPTCHA token.
}
