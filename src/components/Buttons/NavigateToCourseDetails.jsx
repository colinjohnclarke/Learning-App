import { device } from "../../styles/breakpoints";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { UserContext } from "../../App";
import MainActionBtn from "./MainActionBtn";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Link } from "react-router-dom";

function NavigateToCourseDetails({ ...atributes }) {
  const params = useParams();

  const { darkThemeActive } = useContext(UserContext);
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/courses/${params.subject}/${params.courseName}`}
    >
      <MainActionBtn
        style={{
          width: "350px",
          color: "white",
          backgroundColor: "rgb(0,245,245)",
          fontWeight: "500",
        }}
        darkThemeActive={darkThemeActive}
        type="button"
        {...atributes}
      >
        Go to Course
      </MainActionBtn>
    </Link>
  );
}

export default NavigateToCourseDetails;
