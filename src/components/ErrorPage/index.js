import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/dashboard");
    }, 5000);
  }, []);

  return (
    <div className="error-page">
      <p>ERROR: Page not found</p>
      <p>You will be redirected to Dashboard in 5 seconds</p>
    </div>
  );
};
