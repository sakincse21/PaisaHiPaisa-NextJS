
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
import envVars from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const fetchFn = async (input: RequestInfo, init?: RequestInit) => {
  // Force using the browser fetch when available
  if (typeof window !== "undefined" && window.fetch) {
    // keep credentials and mode explicit
    return window.fetch(input, { ...(init || {}), credentials: "include", mode: "cors" });
  }
  // fallback (server-side)
  return fetch(input, init);
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${envVars.backendBaseUrl}/api/v1`,
    credentials: "include",
    fetchFn, // ← override here
  }),
  tagTypes: ["USER", "TRANSACTIONS", "SUMMARY", "USERS", "SINGLEUSER", "ADMIN_SUMMARY"],
  endpoints: () => ({}),
});
