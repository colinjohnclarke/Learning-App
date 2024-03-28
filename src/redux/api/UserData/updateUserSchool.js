import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const updateUserSchoolSlice = createApi({
  reducerPath: "updateUserSchoolSlice",
  baseQuery: fetchBaseQuery({
    // baseUrl: `http://localhost:3600`,
    baseUrl: `https://sps-dev-deploy-test1.onrender.com`,
  }),
  tagTypes: ["UserSchool"],
  endpoints: (builder) => ({
    updateUserSchool: builder.mutation({
      query: (schoolDetails) => ({
        url: "/updateschool",
        method: "POST",
        body: schoolDetails,
      }),
      invalidatesTags: ["UserSchool"],
    }),
  }),
});

export const { useUpdateUserSchoolMutation } = updateUserSchoolSlice;
