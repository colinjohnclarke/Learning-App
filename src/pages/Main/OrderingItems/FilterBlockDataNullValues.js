const FilterBlockDataNullValues = (blockItemsWithoutBlanks) => {
  return blockItemsWithoutBlanks
    .filter(
      (item) => item !== null && item.position && item.position.length !== 0
    ) // Add null and position existence check
    .sort((a, b) => a.position - b.position);
};

export default FilterBlockDataNullValues;
