import React, { useState, useContext } from "react";
import { GrNext } from "react-icons/gr";
import styled from "styled-components";
import { CourseFilterContext } from "./CourseFilterContext";

function DropDown({ data, index }) {


  const [isSelected, setIsSelected] = useState(true);
  const [buttonColor, setButtonColor] = useState("white");

  useContext(CourseFilterContext);

  const { dropDownClicked, setDropdownClicked } =
    useContext(CourseFilterContext);

  const heightVal = data.options.length * 50;

  const colorDnClick = () => {
    console.log("clciked");

    setButtonColor((val) => "rgb(0, 259, 250, 0.4)");

    setTimeout(() => {
      setButtonColor((val) => "white");
    }, 200);
  };

  return (
    <li
      onClick={() => {
        colorDnClick();
        setIsSelected((val) => !val);
        setDropdownClicked((state) => {
          const newState = [...state];
          newState[index] = !isSelected;
          return newState;
        });
      }}
      style={{
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        // justifyContent: "center",
        // height: "100%",
        height: isSelected ? `${heightVal}px` : "40px",
        // minHeight: "60px",
        minWidth: "200px",

        borderBottom: "0.3px solid rgb(192,192,192, 0.5)",
        position: "relative",
      }}
    >
      <div
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "98%",
          // marginLeft: "2px",
          backgroundColor: buttonColor,
          transition: "0.4s",
          // marginRight: "10px",
        }}
      >
        <p style={{ fontSize: "13px", marginLeft: "10px" }}>{data.name}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
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
          />
        </div>
      </div>

      {isSelected && (
        <SubList>
          {data.options.map((subItem) => {
            return (
              <ListItem
                onClick={() => {
                  console.log("JDHSJHJD");
                }}
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
    </li>
  );
}

export default DropDown;

const SubList = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  transition: 0.4s;
`;

const ShowSelected = styled.div`
  height: 8px;
  width: 8px;
  margin: 10px;
  border-radius: 50%;
  //   border: 1px solid;
`;
