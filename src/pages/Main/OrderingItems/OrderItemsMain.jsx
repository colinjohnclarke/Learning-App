import React from "react";
import ObjectToArray from "./ObjectToArray";
import FilterBlockDataNullValues from "./FilterBlockDataNullValues";
import RemoveBlockItemsWithoutData from "./RemoveBlockItemsWithoutData";
import CreateArrayOfItemsInPosition from "./CreateArrayOfItemsInPosition";
import CreateArrayOfAflComponents from "./CreateArrayOfAflComponents";

function OrderItemsMain(blockData) {
  // remove textblock data from block data obj as not ordered

  // fetch data based on subject and blockname from

  // convert OBJ to Array so can be used ordered into position

  if (blockData) {
    const convertedArrFromObj = ObjectToArray(blockData);
    // console.log("🚀 ~ Main ~ convertedArrFromObj:", convertedArrFromObj);

    const removeItemsNamesArr = [
      "textblock1",
      "textblock2",
      "textblock3",
      "textblock4",
      "textblock5",
      "coverImage",
      "name",
      "problem_keywords",
      "tags",
    ];

    const removedNonQuizElementsList = convertedArrFromObj?.filter((item) => {
      return !removeItemsNamesArr.includes(item.key);
    });

    // Remove empty items from array

    const blockItemsWithoutBlanks = RemoveBlockItemsWithoutData(
      removedNonQuizElementsList
    );

    // console.log("🚀 ~ Main ~ blockItemsWithoutBlanks:", blockItemsWithoutBlanks);

    const filterBlockDataNullValues = FilterBlockDataNullValues(
      blockItemsWithoutBlanks
    );

    // console.log("filterBlockDataNullValues", filterBlockDataNullValues);

    const arrayOfItemsWithPosition = CreateArrayOfItemsInPosition(
      filterBlockDataNullValues
    );

    // render AFL components based on type
    const arrayOfAflComponents = CreateArrayOfAflComponents(
      arrayOfItemsWithPosition,
      blockData
    );

    return arrayOfAflComponents;
  }
}

export default OrderItemsMain;
