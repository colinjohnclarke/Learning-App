import React, { useState, useContext, useRef, useEffect } from "react";
import { FcNext } from "react-icons/fc";
import styled from "styled-components";
import { CourseFilterContext } from "./CourseFilterContext";
import { UserContext } from "../../../App";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import "animate.css";

function DropDown({
  data,
  index,
  filterTermsArr,
  setFilterTermsArr,
  dropdownsSelected,
  setDropDownsSelected,
}) {
  console.log("🚀 ~ filterTermsArr:", filterTermsArr);
  const [buttonColor, setButtonColor] = useState("white");

  const [isChecked, setIsChecked] = useState(false);

  useContext(CourseFilterContext);

  const { darkThemeActive } = useContext(UserContext);

  const colorDnClick = () => {
    console.log("clciked");
    setButtonColor((val) => "rgb(0, 259, 250, 0.4)");
    setTimeout(() => {
      setButtonColor((val) => "white");
    }, 200);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setIsChecked(checked);

    if (checked) {
      setFilterTermsArr((prevVal) => ({
        ...prevVal,
        [name]: checked,
      }));
    } else {
      setFilterTermsArr((prevVal) => {
        const updatedFilter = { ...prevVal };
        delete updatedFilter[name];
        return updatedFilter;
      });
    }
  };

  const formRef = useRef(null);

  useEffect(() => {
    if (filterTermsArr && filterTermsArr.length === 0) {
      handleResetForm();
    }
  }, [filterTermsArr]);

  const handleResetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };
  const subList = (
    <SubList
      ref={formRef}
      style={{ height: "auto", transition: "1.5s" }}
      darkThemeActive={darkThemeActive}
    >
      {data.options.map((subItem) => {
        return (
          <ListItem
            className="animate__animated animate__fadeIn"
            darkThemeActive={darkThemeActive}
            style={{
              width: "100%",
              height: "50px",
            }}
          >
            <label class="custom-checkbox">
              <input
                type="checkbox"
                id={subItem}
                name={subItem}
                value={subItem}
                onChange={handleCheckboxChange}
                class="custom-checkbox"
                style={{
                  margin: "10px",
                  backgroundColor: darkThemeActive
                    ? ThemeStyles.lightThemePrimaryBackgroundColor
                    : ThemeStyles.darkThemeSecondaryBackgroundColor,
                }}
              />
              <span class="checkmark"></span>
            </label>

            <p style={{ marginLeft: "5px", fontSize: "13px" }}>{subItem}</p>
          </ListItem>
        );
      })}
    </SubList>
  );
  let objName;
  if (data.name === "Age Group") {
    objName = "ageGroup";
  } else if (data.name === "Subject") {
    objName = "subject";
  } else if (data.name === "Exam Board") {
    objName = "examBoard";
  } else if (data.name === "Skill") {
    objName = "skill";
  } else if (data.name === "Tier") {
    objName = "tier";
  }

  return (
    <div style={{ width: "100%" }}>
      <Li
        darkThemeActive={darkThemeActive}
        onClick={() => {
          colorDnClick();

          setDropDownsSelected((val) => ({
            ageGroup: false,
            subject: false,
            examBoard: false,
            skill: false,
            tier: false,
          }));

          if (dropdownsSelected[objName]) {
            setDropDownsSelected((prevVal) => {
              const updated = { ...prevVal };
              updated[objName] = false;
              return updated;
            });
          } else {
            setDropDownsSelected((prevVal) => {
              const updated = { ...prevVal };
              updated[objName] = true;
              return updated;
            });
          }
        }}
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "50px",

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
            // backgroundColor: buttonColor,

            borderRadius: "5px",
            backgroundColor: darkThemeActive
              ? ThemeStyles.lightThemePrimaryBackgroundColor
              : ThemeStyles.darkThemeSecondaryBackgroundColor,
            // marginRight: "10px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              marginLeft: "10px",
              maxHeight: "50px",
              backgroundColor: darkThemeActive
                ? ThemeStyles.lightThemePrimaryBackgroundColor
                : ThemeStyles.darkThemeSecondaryBackgroundColor,
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
              style={{
                backgroundColor:
                  dropdownsSelected && dropdownsSelected[objName]
                    ? "rgb(0, 250, 250)"
                    : "",
              }}
            ></ShowSelected>
            <FcNext
              style={{
                transition: "0.3s",
                transform:
                  dropdownsSelected && dropdownsSelected[objName]
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
              }}
            />
          </div>
        </div>
      </Li>
      {dropdownsSelected && dropdownsSelected[objName] && subList}
    </div>
  );
}

export default DropDown;

const Li = styled.li`
  margin-top: 4px;
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
  transition: 0.3s;
  height: 0px;
  width: 100%;

  max-height: 300px; /* Adjust the height as needed */
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.2s;

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
  height: 0px;

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
