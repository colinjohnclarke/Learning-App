const test_api = async (api_Url) => {
  try {
    const response = await fetch(api_Url);
    const result = await response.json();
    console.log("RESULT", result.result);
    return result.result;
  } catch (error) {
    console.log(error);
  }
};

export default test_api;
