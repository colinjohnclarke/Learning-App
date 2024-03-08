import React, { useContext, useEffect } from "react";
import DashboardHeader from "./Dashboard/DashboardHeader/DashboardHeader";
import NavigationBarMobile from "../components/Navigation/NavigationBarMobile";
// import UserContext from "../App";

export default function Settings() {
  return (
    <div>
      <DashboardHeader></DashboardHeader>
      <NavigationBarMobile />
    </div>
  );
}
