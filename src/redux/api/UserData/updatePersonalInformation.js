import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const updatePersonalInformationSlice = createApi({
  reducerPath: "updatePersonalInformationSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3600`,
    // baseUrl: `https://sps-dev-deploy-test1.onrender.com`,
  }),
  tagTypes: ["PersonalInformation"],

  endpoints: (builder) => ({
    updatePersonalInformation: builder.mutation({
      query: (personalDetails) => ({
        url: "/updatepersonalinformation",
        method: "POST",
        body: personalDetails,
      }),
      invalidatesTags: ["PersonalInformation"],
    }),
  }),
});

export const { useUpdatePersonalInformationMutation } =
  updatePersonalInformationSlice;
