class AppConfig {
    public readonly isDevelopment = import.meta.env.DEV;
    public readonly isProduction = import.meta.env.PROD;
    public readonly serverUrl = "http://localhost:3000";
    public readonly paintingsUrl = "http://localhost:3000/api/paintings/";
    public readonly registerUrl = "http://localhost:3000/api/auth/register";
    public readonly loginUrl = "http://localhost:3000/api/auth/login";
    public readonly refreshTokenUrl = "http://localhost:3000/api/refresh-token/";
    public readonly captchaSiteKey = import.meta.env.VITE_CAPTCHA_SITE_KEY;
}

export const appConfig = new AppConfig(); // Singleton
