import React from "react";
import { recentCourseList } from "../RecentCourseList";
import { Link } from "react-router-dom";
import styled from "styled-components";

function SeeAllCourses() {
  return (
    <div>
      {recentCourseList.map((item) => (
        <Link
          key={item.id} // Add a unique key prop for each item
          style={{ display: "flex", width: "100%", textDecoration: "none" }}
          to={`/courses/biology`} // Use the subject from the item to dynamically generate the URL
        >
          <Box>
            <Text>
              <p
                style={{
                  fontSize: "12px",
                  listStyle: "none",
                  paddingLeft: "10px",
                  fontWeight: "600",
                }}
              >
                {item.subject}:
              </p>
              <p
                style={{
                  fontSize: "12px",
                  listStyle: "none",
                  paddingLeft: "10px",
                }}
              >
                {item.courseName}
              </p>
            </Text>
            <Image src={item.imageUrl} alt={item.courseName} />{" "}
            {/* Provide an alt attribute for accessibility */}
          </Box>
        </Link>
      ))}
    </div>
  );
}

export default SeeAllCourses;

const Box = styled.a`
  height: 60px;
  width: 100%;
  min-width: 290px;
  margin: 2px;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
  background-color: rgb(255, 255, 255);
  transition: 0.4s;

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 200, 200, 0.3);
    transition: 0.4s;
  }
`;

const Text = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Image = styled.img`
  height: 100%;
  width: 33.3%;
  border-radius: 5px;
  max-width: 100px;
`;
