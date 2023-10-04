import { useState, useEffect, useContext } from "react";
import "./App.css";
import Routing from "./routes/Routing";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer";

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <Drawer /> */}
        {/* <Header></Header> */}
        <Routing />
      </BrowserRouter>
    </div>
  );
}

export default App;
