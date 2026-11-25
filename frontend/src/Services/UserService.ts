import axios from "axios";
import type { UserModel } from "../Models/UserModel";
import { appConfig } from "../Utils/AppConfig";
import { jwtDecode } from "jwt-decode"; // npm i jwt-decode
import { userSlice } from "../Redux/UserSlice";
import { store } from "../Redux/Store";
import type { CredentialsModel } from "../Models/CredentialsModel";

class UserService {

    public constructor() {

        // Read JWT from local storage: 
        const jwt = localStorage.getItem("jwt");

        // If we have the JWT:
        if (jwt) {
            try {
                // Extract the user from the JWT:
                const decoded = jwtDecode<{ user: UserModel; userId: string; roleId: number }>(jwt);

                // Check if token has the correct structure
                if (decoded.user) {
                    const dbUser = decoded.user;
                    // Save user to global state: 
                    const action = userSlice.actions.initUser(dbUser);
                    store.dispatch(action);
                } else if (decoded.userId) {
                    // Token format without user object - clear it
                    localStorage.removeItem("jwt");
                }
            } catch (err) {
                // Invalid token - remove it
                localStorage.removeItem("jwt");
            }
        }
    }

    // Register a new user: 
    public async register(user: UserModel): Promise<void> {

        // Send user to backend: 
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // Extract the JWT:
        const jwt = response.data;

        // Save JWT in the local storage: 
        localStorage.setItem("jwt", jwt);

        // Extract the user from the JWT:
        const dbUser = jwtDecode<{ user: UserModel }>(jwt).user;

        // Save user to global state: 
        const action = userSlice.actions.initUser(dbUser);
        store.dispatch(action);
    }

    // Login as existing user: 
    public async login(credentials: CredentialsModel): Promise<void> {

        // Send credentials to backend: 
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        // Extract the JWT:
        const jwt = response.data;

        // Save JWT in the local storage: 
        localStorage.setItem("jwt", jwt);

        // Extract the user from the JWT:
        const dbUser = jwtDecode<{ user: UserModel }>(jwt).user;

        // Save user to global state: 
        const action = userSlice.actions.initUser(dbUser);
        store.dispatch(action);
    }

    // Logout user: 
    public logout(): void {

        // Remove JWT from local storage: 
        localStorage.removeItem("jwt");

        // Logout user from global state:
        const action = userSlice.actions.logoutUser();
        store.dispatch(action);
    }

}

export const userService = new UserService();
export { UserService };