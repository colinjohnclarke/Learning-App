import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userDataSlice = createApi({
  reducerPath: "userDataSlice",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3600` }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/getallusers",
      providesTags: ["Users"],
    }),
    getUserByEmail: builder.query({
      query: (email) => `/getuser?email=${email}`,
      providesTags: ["Users"],
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: "/getuser",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),

    updateUserData: builder.mutation({
      query: (user) => ({
        url: "/getuserdata",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByEmailQuery,
  useCreateUserMutation,
  useUpdateUserDataMutation,
} = userDataSlice;
