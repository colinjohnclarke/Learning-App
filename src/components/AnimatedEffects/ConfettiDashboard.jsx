import React from "react";
import ConfettiExplosion from "react-confetti-explosion";

function ConfettiDashboard() {
  const propsConfetti = {
    particleSize: 5,

    colors: ["rgba(0,245,245)", "rgb(58, 57, 57)"],
  };
  return <ConfettiExplosion {...propsConfetti} />;
}

export default ConfettiDashboard;
