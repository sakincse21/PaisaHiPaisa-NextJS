// import envVars from "@/config";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${envVars.backendBaseUrl}/api/v1`, // This hits src/app/api/v1/[...slug]/route.ts
//     credentials: "include",
//   }),
//   tagTypes: ["USER", "TRANSACTIONS", "SUMMARY", "USERS", "SINGLEUSER", "ADMIN_SUMMARY"],
//   endpoints: () => ({}),
// });

// services/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    // ✅ Change to relative path. 
    // The browser treats this as a request to the frontend server.
    baseUrl: "/api/v1", 
    credentials: "include",
  }),
  tagTypes: ["USER", "TRANSACTIONS", "SUMMARY", "USERS", "SINGLEUSER", "ADMIN_SUMMARY"],
  endpoints: () => ({}),
});
