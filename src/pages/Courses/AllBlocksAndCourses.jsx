import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import DashboardHeader from "../Dashboard/DashboardHeader";
import bookshelf from "../../assets/images/bookshelf.png";
import SearchCourse from "../../components/Search/SearchCourse";
import FetchCoursefromSanity from "../Dashboard/CourseFilter/FetchCoursefromSanity";
import { device } from "../../styles/breakpoints";
import { Link } from "react-router-dom";
import { defaultCoursesImages } from "../Dashboard/CourseFilter/DefaultCourseImages";
import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import CourseFilter from "../Dashboard/CourseFilter/CourseFilter";
import CourseFilterButton from "../../components/Buttons/CourseFilterBtn";
import PlaceHolderImg from "./PlaceHolderImg";
import RecentCourses from "./RecentCourses";
import { UserContext } from "../../App";
import {
  useGetAllEnrolledCoursesDataQuery,
  useAddEnrolledCourseMutation,
  useGetUserByEmailQuery,
} from "../../features/api/UserData/enrolledCourseDataSlice";
import { ThemeStyles } from "../../styles/ThemeStyles";


function AllBlocksAndCourses() {



  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const allCoursesSorted = courses.sort((a, b) =>
    a.courseName.localeCompare(b.courseName)
  );

  const filteredData = allCoursesSorted.filter((item, index, arr) => {
    return index === arr.findIndex((obj) => obj.courseName === item.courseName);
  });

  const courseslist = filteredData.map((item, index) => {
    let imgurl = defaultCoursesImages.find((subItem) => {
      return subItem.subject === item.subject;
    });

    




  return <div>AllBlocksAndCourses</div>;
}

export default AllBlocksAndCourses;
