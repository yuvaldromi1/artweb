import { useSelector } from "react-redux";
import "./AuthMenu.css";
import { type AppState } from "../../../Redux/Store";
import { UserModel } from "../../../Models/UserModel";
import { NavLink } from "react-router-dom";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";

export function AuthMenu() {

    const user = useSelector<AppState, UserModel | null>(state => state.user);

    function logMeOut() {
        notify.success("Bye bye");
        userService.logout();
    }

    return (
        <div className="AuthMenu">

            {user && <div>
                <span>Hello {user.firstName} {user.lastName} | </span>
                <NavLink to="/home" onClick={logMeOut}>Logout</NavLink>
            </div>}

            {!user && <div>
                <span>Hello Guest | </span>
                <NavLink to="/login">Login</NavLink>
                <span> | </span>
                <NavLink to="/register">Register</NavLink>
            </div>}

        </div>
    );
}
