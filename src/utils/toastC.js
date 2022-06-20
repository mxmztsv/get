import toast from "react-hot-toast";

export function toastC(text, type) {
  let func = (t) => {
    return (
      <span className="toast-span">
        <p>{text}</p>
        <button
          className="transparent-button  toast-btn"
          onClick={() => toast.dismiss(t.id)}
        >
          X
        </button>
      </span>
    );
  };

  if (type === 0) toast.success((t) => func(t));
  else if (type === 1) toast.error((t) => func(t));
  else toast((t) => func(t));
}
