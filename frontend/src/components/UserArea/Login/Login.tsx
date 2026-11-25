import { useForm } from "react-hook-form";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import type { CredentialsModel } from "../../../Models/CredentialsModel";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";

export function Login() {

    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await userService.login(credentials);
            notify.success("Welcome Back!");
            navigate("/home");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(send)}>
                <h2>Login</h2>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email" {...register("email")} required maxLength={50} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" {...register("password")} required minLength={4} maxLength={50} />
                </div>

                <button type="submit">Login</button>

            </form>

        </div>
    );
}
