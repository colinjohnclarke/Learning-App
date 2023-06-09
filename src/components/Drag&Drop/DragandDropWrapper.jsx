import React from "react";
import DragDropRandomise from "./DragDropRandomise";

function DragandDropWrapper(props) {
  const data = props.order_items_drag_drop;

  return data?.map((item, index) => (
    <div>
      <DragDropRandomise order_items_drag_drop={item}></DragDropRandomise>
    </div>
  ));
}

export default DragandDropWrapper;
