export function copyText(name, num, isName) {
  if (!num) num = 0;
  let copyText;
  if (!isName) {
    // @ts-ignore
    copyText = document.getElementsByClassName(name)[num].innerText;
  } else {
    copyText = document.getElementsByName(name)[num].innerText;
  }
  navigator.clipboard.writeText(copyText);
}
