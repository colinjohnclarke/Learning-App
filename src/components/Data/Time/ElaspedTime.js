function elapsedTime(startTime) {
  const time = Date.now();

  let elapsedTime = time - startTime;

  return elapsedTime;
}

export default elapsedTime;
