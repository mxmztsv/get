import { Toaster } from "react-hot-toast";
import useWindowDimensions from "../../hooks/useWindow";
import { toastStyles } from "./ToastStyles";

export const ToastObj = () => {
  const { width } = useWindowDimensions();
  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={toastStyles}
        containerStyle={{
          top: width < 815 ? "10vh" : 20,
        }}
      />
    </div>
  );
};
