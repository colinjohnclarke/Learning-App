import FetchCoursefromSanity from "../Dashboard/CourseFilter/FetchCoursefromSanity";
import { defaultCoursesImages } from "../Dashboard/CourseFilter/DefaultCourseImages";
import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";

function AllBlocksAndCourses() {
  const courses = FetchCoursefromSanity();
  const builder = imageUrlBuilder(sanityClient);

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

    // Rest of your code

    return courseslist;
  });

  return courseslist;
}

export default AllBlocksAndCourses;
