import { useContext } from "react";
import { UserContext } from "../../App";
import FetchBlocksfromSanity from "../../pages/Courses/FetchfromSanityFns/FetchBlocksFromSanity";

function CoursePercentageCompletion({ subject, courseName }) {
  const course = FetchBlocksfromSanity();
  const { userData } = useContext(UserContext);

  const blocks = course
    .filter((course) => {
      return course.courseName === courseName;
    })
    .sort((a, b) => {
      return a.blockPositioninCourse - b.blockPositioninCourse;
    });

  // find which blocks user has completed and update continue button to start next block
  const blocksCompleted = userData?.user.blocksCompleted;

  const completedBlocks = blocksCompleted?.filter((block) => {
    return block.courseName === courseName && block.Subject === subject;
  });

  const percentageCompletion = (completedBlocks.length / blocks.length) * 100;

  return percentageCompletion;
}

export default CoursePercentageCompletion;
