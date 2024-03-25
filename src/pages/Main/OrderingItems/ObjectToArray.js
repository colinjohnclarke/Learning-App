function objectToArray(obj) {
  if (obj) {
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return { key, children: objectToArray(value) };
      } else {
        return { key, value };
      }
    });
  }
}

export default objectToArray;
