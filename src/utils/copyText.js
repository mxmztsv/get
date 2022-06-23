export function copyText(name, num, isName) {
  if (!num) num = 0;
  let copyText;

  if (!isName) {
    // @ts-ignore
    copyText = document.getElementsByClassName(name)[num].innerText;
  } else {
    // @ts-ignore
    copyText = document.getElementsByName(name)[num].value;
  }
  navigator.clipboard.writeText(copyText);
}
