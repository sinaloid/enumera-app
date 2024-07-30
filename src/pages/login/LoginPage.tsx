import "./Login.css";
import logo from "../../assets/images/logo.png";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonList,
  IonPage,
  IonRow,
} from "@ionic/react";
import { lockClosed } from "ionicons/icons";
import IdSvg from "../../components/svg/IdSvg";
import LockSvg from "../../components/svg/LockSvg";
import { useHistory } from "react-router";
import { Container } from "../../components";

const LoginPage: React.FC = () => {
  const history = useHistory();

  const navigate = (e: any, name: any) => {
    e.preventDefault();
    history.push("/" + name);
  };
  return (
    <IonPage>
      <IonContent>
        <Container sizeMd={"4"}>
          <div className="d-flex ion-justify-content-center">
            <img
              className="welcome-img"
              width={"50%"}
              src={logo}
              alt="logo enumera"
            />
          </div>
          <h1 className="text-center ion-text-uppercase title-3 my-3 fw-bold">
            Connexion
          </h1>

          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <div className="my-2">Numéro matricule ou de téléphone</div>
                <IonInput
                  className="custom-input"
                  aria-label="Email"
                  placeholder="Enrez votre numéro matricule ou de téléphone"
                  fill="outline"
                >
                  <span slot="start" className="pe-">
                    <IdSvg />
                  </span>
                </IonInput>
              </IonCol>
              <IonCol size="12">
                <div className="my-2">Mot de passe</div>
                <IonInput
                  type="password"
                  className="custom-input"
                  aria-label="Email"
                  placeholder="Entrez votre mot de passe"
                  fill="outline"
                >
                  <span slot="start" className="p- i-24 m-">
                    <LockSvg />
                  </span>
                  <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                </IonInput>
              </IonCol>
            </IonRow>
          </IonGrid>
          <div className="d-flex ion-justify-content-center my-3">
            <IonButton
              onClick={(e) => navigate(e, "tabs")}
              shape="round"
              color={"primary"}
              className="w-75"
            >
              Se connecter
            </IonButton>
          </div>
          <div className="text-center">
            <span>Vous n'avez pas de compte ?</span> <br />
            <span className="text-primary fw-bold">Inscrivez-vous ici</span>
          </div>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
