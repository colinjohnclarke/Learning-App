import { useEffect } from "react";

function UserThemePrefsLocalStorage({
  setDarkThemeActive,
  setSilentModeActive,
}) {
  useEffect(() => {
    const storedDarkThemeActive = localStorage.getItem("darkThemeActive");
    const storedSilentModeActive = localStorage.getItem("silentModeActive");

    storedDarkThemeActive
      ? setDarkThemeActive(true)
      : setDarkThemeActive(false);

    storedSilentModeActive
      ? setSilentModeActive(true)
      : setSilentModeActive(false);
  }, []);
}

export default UserThemePrefsLocalStorage;
