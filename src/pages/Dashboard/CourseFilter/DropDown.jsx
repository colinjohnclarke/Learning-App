import React, { useState, useContext } from "react";
import { GrNext } from "react-icons/gr";
import styled from "styled-components";
import { CourseFilterContext } from "./CourseFilterContext";
import { UserContext } from "../../../App";
import { ThemeStyles } from "../../../styles/ThemeStyles";

function DropDown({ data, index }) {
  const [isSelected, setIsSelected] = useState(false);
  const [buttonColor, setButtonColor] = useState("white");

  useContext(CourseFilterContext);

  const { darkThemeActive } = useContext(UserContext);

  // const { dropDownClicked, setDropdownClicked } =
  //   useContext(CourseFilterContext);

  const heightVal = data.options.length * 50;

  const colorDnClick = () => {
    console.log("clciked");
    setButtonColor((val) => "rgb(0, 259, 250, 0.4)");
    setTimeout(() => {
      setButtonColor((val) => "white");
    }, 200);
  };

  return (
    <Li
      darkThemeActive={darkThemeActive}
      onClick={() => {
        colorDnClick();
        setIsSelected((val) => !val);
        // setDropdownClicked((state) => {
        //   const newState = [...state];
        //   newState[index] = !isSelected;
        //   return newState;
        // });
      }}
      style={{
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        // justifyContent: "center",
        // height: "100%",
        height: isSelected ? `${heightVal}px` : "50px",

        // minHeight: "60px",

        // borderBottom: "0.3px solid rgb(192,192,192, 0.5)",
        position: "relative",
        borderRadius: "5px",
      }}
    >
      <div
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

          width: "100%",
          height: "100%",
          // marginLeft: "2px",
          backgroundColor: buttonColor,
          transition: "0.4s",
          borderRadius: "5px",
          // marginRight: "10px",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            marginLeft: "10px",
            maxHeight: "50px",
          }}
        >
          {data.name}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "30%",
          }}
        >
          <ShowSelected
            style={{ backgroundColor: isSelected ? "rgb(0, 250, 250)" : "" }}
          ></ShowSelected>
          <GrNext
            style={{
              transform: isSelected ? "rotate(90deg)" : "rotate(0deg)",
              transition: "0.4s",
            }}
            fill={"rgb(0, 250, 250)"}
          />
        </div>
      </div>

      {isSelected && (
        <SubList darkThemeActive={darkThemeActive}>
          {data.options.map((subItem) => {
            return (
              <ListItem
                darkThemeActive={darkThemeActive}
                style={{
                  width: "100%",
                }}
              >
                <input
                  type="checkbox"
                  id={subItem}
                  name={subItem}
                  value={subItem}
                  style={{ margin: "5px" }}
                />
                <p style={{ marginLeft: "5px", fontSize: "13px" }}>{subItem}</p>
              </ListItem>
            );
          })}
        </SubList>
      )}
      {/* {JSON.stringify(isSelected)} */}
    </Li>
  );
}

export default DropDown;

const Li = styled.li`
  margin: 3px;
  border-radius: 5px;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};
`;

const SubList = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};
`;

const ListItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  transition: 0.4s;
  border-radius: 5px;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;

const ShowSelected = styled.div`
  height: 8px;
  width: 8px;
  margin: 10px;
  border-radius: 50%;
`;
