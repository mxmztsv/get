export function getGreeting() {
  let date = new Date();
  let hours = date.getHours();
  let text = "Good ";

  if (hours >= 6 && hours < 12) text += "morning";
  if (hours >= 12 && hours < 17) text += "afternoon";
  if (hours >= 17 && hours < 21) text += "evening";
  if (hours >= 21 || hours < 6) text += "night";

  return text;
}
