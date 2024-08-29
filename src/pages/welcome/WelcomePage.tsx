import "./Welcome.css";
import welcome from "../../assets/images/welcome.jpg";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
} from "@ionic/react";
import { useHistory } from "react-router";
import { Container } from "../../components";

const WelcomePage: React.FC = () => {
  const history = useHistory();

  const navigate = (e: any, name: string) => {
    e.preventDefault();
    history.push("/" + name);
  };
  return (
    <IonPage>
      <IonContent>
        <Container
          classNameGrid={"p-0"}
          classNameRow={"p-0"}
          classNameCol={"p-0"}
          sizeMd={"3"}
        >
          <div className="">
            <img
              className="welcome-img"
              width={"100%"}
              src={welcome}
              alt="logo enumera"
            />
          </div>
          <h1 className="text-center ion-text-uppercase title-3 my-3 fw-bold">
            Bienvenue dans ENUMERA
          </h1>

          <div className="d-flex ion-justify-content-center mb-3">
            <IonButton
              onClick={(e) => navigate(e, "login")}
              shape="round"
              color={"primary"}
              className="w-75"
            >
              Connexion
            </IonButton>
          </div>
          <div className="d-flex ion-justify-content-center mb-3">
            <IonButton
              onClick={(e) => navigate(e, "register")}
              shape="round"
              className="secondary w-75"
            >
              Inscription
            </IonButton>
          </div>
          <div className="d-flex ion-justify-content-center">
            <span className="text-primary fw-bold">Continuer sans compte</span>
          </div>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
