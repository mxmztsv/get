export function copyText(classN, num) {
  if (!num) num = 0;
  // @ts-ignore
  let copyText = document.getElementsByClassName(classN)[num].innerText;
  navigator.clipboard.writeText(copyText);
}
