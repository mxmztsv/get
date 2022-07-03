const cssStyle = {
  background: "#171614",
  color: "white",
  fontFamily: "Montserrat",
  paddingRight: "0px",
};
export const toastStyles = {
  duration: 5000,
  style: cssStyle,
  success: {
    duration: 8000,
    style: cssStyle,
  },
  error: {
    duration: 10000,
    theme: {
      primary: "red",
      secondary: "black",
    },
    style: cssStyle,
  },
};
