import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// https://sps-online-server2.onrender.com
export const userDataSlice = createApi({
  reducerPath: "userDataSlice",
  baseQuery: fetchBaseQuery({
    // baseUrl: `https://sps-dev-deploy-test1.onrender.com`,
    baseUrl: `http://localhost:3600`,
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/getallusers",
      providesTags: ["Users"],
    }),
    getTop10Users: builder.query({
      query: () => "/gettop10users",
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

    // addEnrolledCourse: builder.mutation({
    //   query: (course) => ({
    //     url: "/getenrolledcoursedata",
    //     method: "POST",
    //     body: course,
    //   }),
    //   invalidatesTags: ["Users"],
    // }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetTop10UsersQuery,
  useGetUserByEmailQuery,
  useCreateUserMutation,
  useUpdateUserDataMutation,
  // useAddEnrolledCourseMutation
} = userDataSlice;
