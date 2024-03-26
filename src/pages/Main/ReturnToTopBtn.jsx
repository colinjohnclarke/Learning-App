import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaArrowCircleUp } from "react-icons/fa";

function ReturnToTopBtn() {
  const [userHasScrolledDown, setUserHasScrolledDown] = useState(false);
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setUserHasScrolledDown(true);
      } else {
        setUserHasScrolledDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Wrapper
      style={{ display: userHasScrolledDown ? "flex" : "none" }}
      onClick={scrollToTop}
    >
      <FaArrowCircleUp fill="white" size="45"></FaArrowCircleUp>
    </Wrapper>
  );
}

export default React.memo(ReturnToTopBtn);

const Wrapper = styled.button`
  height: 50px;
  width: 50px;
  border: none;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  background-color: rgb(0, 245, 245);
  color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  &:active {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;
  }
`;
