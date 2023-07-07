export const colors = {
  correctColor: "rgba(137, 240, 158, 0.9)",
  incorrectColor: "rgba(240, 137, 137, 0.9)",
  normalInputColor: "white",
};

export const correctstyle = {
  display: "flex",
  flexDirection: "row",
  position: "absolute",
  justifyContent: "space-between",
  transition: "0.3s",
  color: "white",
  backgroundColor: "rgba(137, 240, 158, 0.9)",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
};
export const incorrectstyle = {
  display: "flex",
  flexDirection: "row",
  position: "relative",
  justifyContent: "space-between",
  paddingBottom: "0",
  color: "red",
  boxShadow:
    "0 0 0 1px #6698cb inset, 0 0 0 2px rgba(255,255,255,0.15) inset, 0 8px 0 0 rgba(240, 137, 137, 0.34), 0 8px 0 1px rgba(220, 137, 137, 0.56),0 8px 8px 1px rgba(0,0,0,0.5)",

  backgroundColor: "rgba(240, 137, 137, 0.9)",
};

export const normalboxstyle = {};

export const normalboxstyledragItem = {
  display: "flex",
  backgroundColor: "white",
  boxShadow:
    "rgba(0, 200, 200, 0.39) 0px 2px 4px inset, 0 0 0 2px rgba(0, 200, 200, 0.39) inset, 0 8px 0 0 rgba(39, 106, 245, 0.3), 0 8px 0 1px rgba(39, 106, 245, 0.3), 0 8px 8px 1px rgba(39, 106, 245, 0.3),rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px,rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset,rgba(0, 0, 0, 0.2) 0px 5px 10px;",
};

export const normalboxstyleHover = {
  boxShadow:
    "rgba(0, 200, 200, 0.39) 0px 2px 4px inset, 0 0 0 2px rgba(0, 200, 200, 0.39) inset, 0 8px 0 0 rgba(39, 106, 245, 0.3), 0 8px 0 1px rgba(39, 106, 245, 0.3), 0 8px 8px 1px rgba(39, 106, 245, 0.3)",

  transform: "translateY(-3px)",
  color: "black",
  // backgroundColor: "rgba(39, 106, 245, 0.5)",
  backgroundColor: "red",
};

export const selectedbuttonstyle = {
  transform: "translateY(6px)",
  backgroundColor: "rgba(39, 106, 245, 0.7",
  boxShadow: "none",
  color: "white",
};
