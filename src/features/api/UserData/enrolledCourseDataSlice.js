import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const enrolledCourseDataSlice = createApi({
  reducerPath: "enrolledCourseDataSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3600`,
  }),
  tagTypes: ["EnrolledCourses"],
  endpoints: (builder) => ({
    getAllEnrolledCoursesData: builder.query({
      query: () => "/getallenrolledcourses",
      providesTags: ["EnrolledCourses"],
    }),
    // getEnrolledCourseData: builder.query({
    //   query: () => "/getenrolledcoursedata",
    //   providesTags: ["EnrolledCourses"],
    // }),
    addEnrolledCourse: builder.mutation({
      query: (course) => ({
        url: "/addenrolledcourse",
        method: "POST",
        body: course,
      }),
      invalidatesTags: ["EnrolledCourses"],
    }),
    // deleteEnrolledCourse: builder.mutation({
    //   query: ({ courseName }) => ({
    //     url: "/deleteenrolledcourse",
    //     method: "DELETE",
    //     body: courseName,
    //   }),
    //   invalidatesTags: ["EnrolledCourses"],
    // }),
  }),
});

export const {
  useGetAllEnrolledCoursesDataQuery,
  // useGetEnrolledCourseData,
  useAddEnrolledCourseMutation,
  // useDeleteEnrolledCourse,
} = enrolledCourseDataSlice;
