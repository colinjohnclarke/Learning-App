const CreateArrayOfItemsInPosition = (filterBlockDataNullValues) => {
  const arrOfObj = filterBlockDataNullValues.flatMap((item) => ({
    type: item.type,
    position: item.position.map((item) => item.positionVal),
  }));

  const flat = arrOfObj
    .filter((item) => item.position.some((item) => item && item.length !== 0))
    .map((item) => ({ type: item.type, position: item.position.flat() }));

  const data = flat
    .flatMap((item) => {
      let type = item.type;

      const mapcomp = item.position.map((subItem, index) => {
        return {
          position: subItem,
          type,
          index,
        };
      });

      return mapcomp;
    })
    .sort((a, b) => {
      return a.position - b.position;
    });

  return data;
};
export default CreateArrayOfItemsInPosition;
