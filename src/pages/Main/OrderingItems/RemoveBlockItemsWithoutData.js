const RemoveBlockItemsWithoutData = (convertedArrFromObj) => {
  const newData = convertedArrFromObj.flatMap((item) => {
    const type = item.key;
    const position = item.children?.flatMap((subItem) => {
      const positionVal = subItem.children
        ?.filter((subsub) => subsub.key === "position")
        ?.map((subsub) => subsub.value);

      return { positionVal };
    });

    return item.children ? { type, position } : null;
  });

  return newData;
};

export default RemoveBlockItemsWithoutData;
