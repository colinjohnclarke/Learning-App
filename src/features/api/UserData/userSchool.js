import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userSchoolSlice = createApi({
  reducerPath: "userSchoolSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3600`,
    // baseUrl: `https://sps-dev-deploy-test1.onrender.com`,
  }),
  tagTypes: ["userSchool"],
  endpoints: (builder) => ({
    getUserSchool: builder.query({
      query: (schoolQuery) => `/getschool?schoolQuery=${schoolQuery}`,
      providesTags: ["userSchool"],
    }),
  }),
});

export const { useGetUserSchoolQuery } = userSchoolSlice;
