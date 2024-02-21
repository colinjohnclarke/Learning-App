import DataFromPrevWeek from "../DataFromPrevWeek";

function XPPointsScoredToday() {
  const dataLastWeek = DataFromPrevWeek();
  const date = new Date();
  let day = date.getDate();

  if (day < 10) {
    day = "0" + day;
  }

  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  const year = date.getFullYear();
  const today = `${year}-${month}-${day}`;

  const content = dataLastWeek?.filter((quizData) => {
    if (quizData.timeStamp.substring(0, 10) === today) {
      return quizData;
    }
  });

  let calc = 0;

  content?.forEach((item) => {
    return (calc += item.XPScored);
  });

  return calc;
}

export default XPPointsScoredToday;
