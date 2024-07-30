import { IonApp } from "@ionic/react";
import "./Loading.css";
import logo from "../../assets/images/logo.png";
import { useHistory } from "react-router";
import { useEffect } from "react";
const LoadingPage: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    const timeout = setTimeout(() => {
      history.replace("welcome");
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="position-relative load-container">
      <div className="d-flex justify-content-center align-items-center logo-container">
        <div>
          <img width={"100%"} src={logo} alt="logo enumera" />
        </div>
      </div>

      <div className="position-absolute bottom-0 w-100 text-center py-3">
        <span>Version 1.0</span>
      </div>
    </div>
  );
};

export default LoadingPage;
