var plusOne = function (digits) {
  const lastIndex = digits.length - 1;

  let copy = [];
  if (digits[lastIndex] !== 9) {
    digits[lastIndex] += 1;
  } else {
    copy = digits;
    copy.pop();
    copy.push(1, 0);
  }

  return copy;
};

const digits = [9];

console.log(plusOne(digits));
