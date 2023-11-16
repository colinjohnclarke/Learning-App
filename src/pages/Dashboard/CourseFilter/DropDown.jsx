import React, { useState, useContext } from "react";
import { GrNext } from "react-icons/gr";
import styled from "styled-components";
import { CourseFilterContext } from "./CourseFilterContext";

function DropDown({ data, index }) {
  const [isSelected, setIsSelected] = useState(false);

  useContext(CourseFilterContext);

  const { dropDownClicked, setDropdownClicked } =
    useContext(CourseFilterContext);

  console.log(
    "🚀 ~ file: DropDown.jsx:12 ~ DropDown ~ dropDownClicked:",
    dropDownClicked
  );
  const heightVal = data.options.length * 50;

  return (
    <li
      onClick={() => {
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
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        // height: "100%",
        height: isSelected ? `${heightVal}px` : "50px",
        // minHeight: "60px",
        minWidth: "200px",
        transition: "0.3s",
        borderBottom: "0.3px solid light-grey",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          //   listStyle: "none",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "95%",
          marginLeft: "20px",
          marginRight: "10px",
        }}
      >
        <p style={{ fontSize: "13px" }}>{data.name}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "end",

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
              transition: "0.3s",
            }}
          />
        </div>
      </div>

      {isSelected && (
        <SubList>
          {data.options.map((subItem) => {
            return (
              <ListItem
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

const SubList = styled.div`
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
  //   border-bottom: 1px solid;

  //   transition: 0.3s;
  //   height: 60px;
  //   width: 60px;
`;

const ShowSelected = styled.div`
  height: 8px;
  width: 8px;
  margin: 10px;
  border-radius: 50%;
  //   border: 1px solid;
`;
