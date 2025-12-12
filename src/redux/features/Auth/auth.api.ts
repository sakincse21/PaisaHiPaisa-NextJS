// Need to use the React-specific entry point to import createApi
import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
        credentials: 'include'
      }),
      invalidatesTags: ["USER"], // ✅ Refetch user data after login
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/create",
        method: "POST",
        body: userInfo,
        credentials: 'include'
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: 'include',
      }),
      invalidatesTags: ["USER", "TRANSACTIONS", 'ADMIN_SUMMARY', 'SINGLEUSER', 'USERS', 'SUMMARY']
    }),
  }),
  overrideExisting: true
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = authApi;
