import { AiOutlineDashboard } from "react-icons/ai";
import { BsActivity } from "react-icons/bs";
import {
  GiBookshelf,
  GiPlantsAndAnimals,
  GiMaterialsScience,
} from "react-icons/gi";
import { IoMdNotificationsOutline, IoEarthSharp } from "react-icons/io";
import { BiMath, BiHistory } from "react-icons/bi";
import { MdOutlineScience } from "react-icons/md";

import { TbAbc } from "react-icons/tb";
// import { IoEarthOutline } from "react-icons/io";
import { FaComputer, FaEarthAfrica } from "react-icons/fa";
import { RiComputerFill, RiEarthLine } from "react-icons/ri";

const iconStyle = {
  margin: "10px",
  height: "20px",
  width: "20px",
};

export const subjects = [
  {
    name: "Maths",
    icon: <BiMath style={iconStyle} />,
    blocks: [
      { block: "Addition and Subtraction" },
      { block: "Multiplication and Division" },
      { block: "Time" },
      { block: "Writing, Simplifying and Ordering Fractions" },
    ],
  },

  {
    name: "Biology",
    icon: <GiPlantsAndAnimals style={iconStyle} />,
    blocks: [
      { block: "Respiration" },
      { block: "Photosyntheisis" },
      { block: "Cells" },
      { block: "jskdjfkjsd" },
      { block: "sdfsfs" },
    ],
  },
  {
    name: "Chemistry",
    icon: <MdOutlineScience style={iconStyle} />,
    blocks: [
      { block: "Atoms" },
      { block: "Molcules" },
      { block: "States of Matter" },
      { block: "Moles" },
      { block: "Quantitative" },
    ],
  },
  { name: "Physics", icon: <GiMaterialsScience style={iconStyle} /> },
  { name: "English Literature", icon: <GiBookshelf style={iconStyle} /> },
  { name: "English Language", icon: <TbAbc style={iconStyle} /> },
  { name: "Geography", icon: <RiEarthLine style={iconStyle} /> },
  { name: "History", icon: <BiHistory style={iconStyle} /> },
  { name: "Computer Science", icon: <RiComputerFill style={iconStyle} /> },
  { name: "Enterprises", icon: <RiComputerFill style={iconStyle} /> },
];

export const menuItems = [
  {
    name: "Dashboard",
    icon: <AiOutlineDashboard style={iconStyle} />,
  },
  { name: "Activity", icon: <BsActivity style={iconStyle} /> },

  { name: "Courses", icon: <GiBookshelf style={iconStyle} /> },
  {
    name: "Notifications",
    icon: <IoMdNotificationsOutline style={iconStyle} />,
  },
];

// const test = [
//   <AiOutlineDashboard />,
//   <AiOutlineDashboard />,
//   <AiOutlineDashboard />,
// ];

// export const menuItems = test.map((element) => {
//   return (element.style = itemsstyle);
// });

