import MCQ from "../../../components/MCQ/MCQ";
import StudentTextInputWrapper from "../../../components/SingleStudentInput/StudentTextInputWrapper";
import FillMissingValuesTable from "../../../components/Tables/MissingData/FillMissingValues";
import IncorrectWordWrapper from "../../../components/IncorrectWordIdentifier/IncorrectWordWrapper";
import GapFillWrapper from "../../../components/GapFill/GapFillWrapper";
import MovingSliderWrapper from "../../../components/Slider/MovingSliderWrapper";
import DualBoxSelectionWrapper from "../../../components/DualSelection/DualBoxSelectionWrapper";
import DragandDropWrapper from "../../../components/Drag&Drop/DragandDropWrapper";
import LabellingWrapper from "../../../components/Labelling/LabellingWrapper";
import GapFillMultiple from "../../../components/ GapFillMultiple/GapFillMultiple";

const CreateArrayOfAflComponents = (arrayOfItemsWithPosition, blockData) => {
  const {
    subject_skills,
    skills,
    problem_keywords,
    tags,
    labelling,
    MCQ_INPUTS,
    order_items_drag_drop,
    dual_box,
    slider,
    gap_fill,
    gap_fill_multiple,
    incorrect_words_from_text,
    standard_table_variable_names,
    standard_tables,
    student_text_input,
    table,
    line_graph_data,
    textblock1,
    textblock2,
  } = blockData;

  return arrayOfItemsWithPosition.map((item) => {
    let component = null;

    switch (item.type) {
      case "MCQ_INPUTS":
        component = <MCQ data={[MCQ_INPUTS[item.index]]} />;
        break;
      case "student_text_input":
        component = (
          <StudentTextInputWrapper data={[student_text_input[item.index]]} />
        );
        break;
      case "table":
        component = <FillMissingValuesTable data={[table[item.index]]} />;
        break;
      case "incorrect_words_from_text":
        component = (
          <IncorrectWordWrapper
            data={[incorrect_words_from_text[item.index]]}
          />
        );
        break;
      case "gap_fill":
        component = <GapFillWrapper data={[gap_fill[item.index]]} />;
        break;

      case "gap_fill_multiple":
        component = <GapFillMultiple data={[gap_fill_multiple[item.index]]} />;
        break;

      case "slider":
        component = <MovingSliderWrapper data={[slider[item.index]]} />;
        break;

      case "dual_box":
        component = <DualBoxSelectionWrapper data={[dual_box[item.index]]} />;
        break;
      case "order_items_drag_drop":
        component = (
          <DragandDropWrapper data={[order_items_drag_drop[item.index]]} />
        );
        break;

      case "labelling":
        component = <LabellingWrapper data={[labelling[item.index]]} />;
        break;
      default:
        component = <></>;
        break;
    }

    return component;
  });
};

export default CreateArrayOfAflComponents;
