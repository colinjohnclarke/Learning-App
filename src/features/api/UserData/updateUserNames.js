import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const updateUserNamesSlice = createApi({
  reducerPath: "updateUserNamesSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3600`,
    // baseUrl: `https://sps-dev-deploy-test1.onrender.com`,
  }),
  tagTypes: ["UserNames"],
  endpoints: (builder) => ({
    updateUserNames: builder.mutation({
      query: (userNames) => ({
        url: "/updateusernames",
        method: "POST",
        body: userNames,
      }),

      invalidatesTags: ["UserNames"],
    }),
  }),
});

export const { useUpdateUserNamesMutation } = updateUserNamesSlice;
