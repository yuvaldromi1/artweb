import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { userService } from "../../../Services/UserService";
import { appConfig } from "../../../Utils/AppConfig";
import { notify } from "../../../Utils/Notify";
import "./Register.css";

export function Register() {

    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();
    const [captchaToken, setCaptchaToken] = useState<string | null>("");

    async function send(user: UserModel) {
        try {
            if (!captchaToken) {
                notify.error("Please verify that you are a human!");
                return;
            }
            user.captchaToken = captchaToken;
            await userService.register(user);
            notify.success("Welcome!");
            navigate("/home");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    function saveCaptchaToken(captchaToken: string | null): void {
        setCaptchaToken(captchaToken);
    }

    return (
        <div className="Register">
            <form onSubmit={handleSubmit(send)}>
                <h2>Create Account</h2>

                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" placeholder="Enter your first name" {...register("firstName")} required minLength={2} maxLength={50} />
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" placeholder="Enter your last name" {...register("lastName")} required minLength={2} maxLength={50} />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email" {...register("email")} required maxLength={50} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" {...register("password")} required minLength={6} maxLength={50} />
                </div>

                <div className="captcha-container">
                    <ReCAPTCHA sitekey={appConfig.captchaSiteKey} onChange={saveCaptchaToken} />
                </div>

                <button type="submit" disabled={!captchaToken}>Register</button>

            </form>
        </div>
    );
}
