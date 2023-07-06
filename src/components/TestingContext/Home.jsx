import React from "react";
import { useContext } from "react";
import { Context } from "./Context";

function Home() {
  const { user, setUser } = useContext(Context);

  const check = (e) => {
    setUser((prevUser) => prevUser + 1);
  };

  return (
    <div>
      Home
      <h2> {user}</h2>
      <button onClick={check}> Click</button>
    </div>
  );
}

export default Home;
