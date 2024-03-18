import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const schoolXPpointsSlice = createApi({
  reducerPath: "schoolXPpointsSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3600`,
    // baseUrl: `https://sps-dev-deploy-test1.onrender.com`,
  }),
  tagTypes: ["SchoolXPPoints"],
  endpoints: (builder) => ({
    getTop10SchoolXP: builder.query({
      query: (school) => "/schoolxppoints",
      providesTags: ["SchoolXPPoints"],
    }),

    updateSchoolXP: builder.mutation({
      query: (details) => ({
        url: "/schoolxppoints",
        method: "POST",
        body: details,
      }),
    }),
    invalidatesTags: ["SchoolXPPoints"],
  }),
});

export const { useGetTop10SchoolXPQuery, useUpdateSchoolXPMutation } =
  schoolXPpointsSlice;
