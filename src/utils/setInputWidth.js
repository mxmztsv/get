export function setInputWidth(
  refObj,
  value,
  isMain,
  isGet,
  getBalMain,
  usdtBalMain,
  getBalBonus,
  usdtBalBonus,
  title = ""
) {
  if (!refObj || !refObj.current || !refObj.current.style) return;

  let inputStyle = refObj.current.style;
  let passedValue = !isNaN(parseFloat(value.target.value))
    ? parseFloat(value.target.value)
    : "0"; // this value can be bigger than balance

  // get width of text
  const context = document.createElement("canvas").getContext("2d");
  context.font = getComputedStyle(
    document.getElementsByClassName("numbers")[0]
  ).font;
  let textWidth = context.measureText(passedValue.toString()).width;
  if (textWidth < 13) textWidth = 15;

  textWidth += 2;
  if (title === "YOUR INVESTEMENT" || title === "") {
    let maxVal = Number.MAX_SAFE_INTEGER;

    // getting max value for input
    if (isMain !== undefined && isGet !== undefined) {
      if (isMain) {
        maxVal = isGet ? getBalMain : usdtBalMain;
      } else {
        maxVal = isGet ? getBalBonus : usdtBalBonus;
      }
    }

    if ((passedValue || 0) <= maxVal) {
      inputStyle.width = `${textWidth.toString()}px`;
      refObj.current.value = passedValue || 0;
    }
  } else if (["AMOUNT", "GET TOKEN PRICE"].includes(title)) {
    inputStyle.width = `${textWidth.toString()}px`;
    refObj.current.value = passedValue || 0;
  }
}
