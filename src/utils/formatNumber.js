export function fN(number, digits, toStr) {
  let resultNumber;
  if (digits === 1) resultNumber = Math.round(number * 10) / 10;
  else if (digits === 2) resultNumber = Math.round(number * 100) / 100;
  else if (digits === 3) resultNumber = Math.round(number * 1000) / 1000;
  else resultNumber = Math.round(number);

  if (toStr) resultNumber = resultNumber.toLocaleString("en-US");

  return resultNumber;
}
