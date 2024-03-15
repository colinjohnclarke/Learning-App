import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dailyXpGoalSlice = createApi({
  reducerPath: "dailyXpGoalSlice",
  baseQuery: fetchBaseQuery({
    // baseUrl: `http://localhost:3600`,
    baseUrl: `https://sps-dev-deploy-test1.onrender.com`,
  }),
  tagTypes: ["DailyXpGoal"],
  endpoints: (builder) => ({
    updateDailyXpGoal: builder.mutation({
      query: (updatedDailyXPGoal) => ({
        url: "/updatedailyxpgoal",
        method: "POST",
        body: updatedDailyXPGoal,
      }),
      invalidatesTags: ["DailyXpGoal"],
    }),
  }),
});

export const { useUpdateDailyXpGoalMutation } = dailyXpGoalSlice;
