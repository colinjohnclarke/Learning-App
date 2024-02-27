function checkLocalStorageForThemePrefs() {
  let localStorageData;
  if (
    localStorage.getItem("darkThemeActive") === null ||
    localStorage.getItem("silentModeActive") === null
  ) {
    localStorageData = false;
  } else if (
    localStorage.getItem("darkThemeActive") !== null &&
    localStorage.getItem("silentModeActive") !== null
  ) {
    localStorageData = true;
  }

  return localStorageData;
}

export default checkLocalStorageForThemePrefs;
