import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// baseUrl: `https://sps-dev-deploy-test1.onrender.com`,
export const enrolledCourseDataSlice = createApi({
  reducerPath: "enrolledCourseDataSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3600`,
    // baseUrl: `https://sps-dev-deploy-test1.onrender.com`,
  }),
  tagTypes: ["EnrolledCourses"],
  endpoints: (builder) => ({
    getAllEnrolledCoursesData: builder.query({
      query: (id) => `/getallenrolledcourses?id=${id}`,
      providesTags: ["EnrolledCourses"],
    }),

    // builder.query is defined to accept only a single argument.

    getEnrolledCourseData: builder.query({
      query: ({ id, courseName }) =>
        `/getenrolledcoursedata?id=${id}&courseName=${courseName}`,

      providesTags: ["EnrolledCourses"],
    }),
    addEnrolledCourse: builder.mutation({
      query: (course) => ({
        url: "/addenrolledcourse",
        method: "POST",
        body: course,
      }),
      invalidatesTags: ["EnrolledCourses"],
    }),
    updateEnrolledCourse: builder.mutation({
      query: (updatedDetails) => ({
        url: "/updateenrolledcourse",
        method: "POST",
        body: updatedDetails,
      }),
      invalidatesTags: ["EnrolledCourses"],
    }),
    // deleteEnrolledCourse: builder.mutation({
    //   query: ({ topicName }) => ({
    //     url: "/deleteenrolledcourse",
    //     method: "DELETE",
    //     body: topicName,
    //   }),
    //   invalidatesTags: ["EnrolledCourses"],
    // }),
  }),
});

export const {
  useGetAllEnrolledCoursesDataQuery,

  useGetEnrolledCourseDataQuery,
  useAddEnrolledCourseMutation,
  useUpdateEnrolledCourseMutation,
  // useDeleteEnrolledCourse,
} = enrolledCourseDataSlice;
