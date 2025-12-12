const envVars = {
    backendBaseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL as string,
    jwtSecret: process.env.NEXT_PUBLIC_JWT_SECRET as string,
    frontendBaseUrl: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL as string,
}

export default envVars;