import axios, { type InternalAxiosRequestConfig } from "axios";

class Interceptor {

    public create(): void {

        axios.interceptors.request.use((request: InternalAxiosRequestConfig) => {

            const jwt = localStorage.getItem("jwt");

            if (jwt) {
                request.headers.Authorization = "Bearer " + jwt;
            }

            return request;

        });

    }

}

export const interceptor = new Interceptor();
