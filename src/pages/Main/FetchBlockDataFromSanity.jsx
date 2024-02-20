import { useEffect } from "react";
import sanityClient from "../../createclient";

function FetchBlockDataFromSanity(subject, blockName, setData) {
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "${subject}" && name == "${blockName}" ]
            { subject_skills[]->, labelling, 
              coverImage, slider, incorrect_words_from_text, order_items_drag_drop,
                        name, tags, textblock1, textblock2, textblock3, textblock4, textblock5,  hint, problem_keywords[]->,  example_problem, MCQ_INPUTS, MCQ_MATH_INPUTS,  student_text_input, gap_fill, incorrect_words_from_text, table, line_graph_data,
                        standard_tables, standard_table_variable_names
                        }`
      )
      .then((result) => setData(result[0]))
      .catch(console.error);
    window.scrollTo(0, 0);
  }, []);
}

export default FetchBlockDataFromSanity;
