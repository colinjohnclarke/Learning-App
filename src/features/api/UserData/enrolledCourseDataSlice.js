import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// baseUrl: `https://sps-dev-deploy-test1.onrender.com`,
export const enrolledCourseDataSlice = createApi({
  reducerPath: "enrolledCourseDataSlice",
  baseQuery: fetchBaseQuery({
    // baseUrl: `http://localhost:3600`,
    baseUrl: `https://sps-dev-deploy-test1.onrender.com`,
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

  useGetEnrolledCourseDataQuery,
  useAddEnrolledCourseMutation,
  // useDeleteEnrolledCourse,
} = enrolledCourseDataSlice;
