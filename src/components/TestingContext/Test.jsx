import React, { useState } from "react";
import { Context } from "./Context";
import Home from "./Home";

function Test() {
  const arr = [1, 2, 3, 4, 5];
  const [user, setUser] = useState(0);

  return arr.map((item) => {
    return (
      <Context.Provider value={{ user, setUser }}>
        <Home></Home>
        <div>Test</div>
      </Context.Provider>
    );
  });
}

export default Test;
