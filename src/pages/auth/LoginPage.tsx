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
  IonLoading,
  IonPage,
  IonRow,
  IonSpinner,
  useIonLoading,
} from "@ionic/react";
import { lockClosed, navigate } from "ionicons/icons";
import IdSvg from "../../components/svg/IdSvg";
import LockSvg from "../../components/svg/LockSvg";
import { useHistory } from "react-router";
import { Container, Input } from "../../components";
import { useNavigate, useAuth } from "../../hooks";
import { useRequest } from "./hooks";
import { endPoint, request } from "../../services";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

import sos from "../../assets/images/sos_village_.png";
import kamalpha from "../../assets/images/kamalpha.jpeg";
import armories from "../../assets/images/armoiries.png";
import enumera from "../../assets/images/enumera.png";

const validateData = Yup.object({
  user: Yup.string()
    .email("Adresse e-mail invalide")
    .required("Ce champ est obligatoire. Veuillez le remplir pour continuer"),
  password: Yup.string()
    .min(8, "Le mot de passe doit contenir 8 caractères ou moins")
    .required("Ce champ est obligatoire. Veuillez le remplir pour continuer"),
});
const LoginPage: React.FC = () => {
  const history = useHistory();
  const { user, login, logout, isAuth } = useAuth();
  const { post } = useRequest();
  const [present, dismiss] = useIonLoading();
  const [error, setError] = useState("");
  useEffect(() => {
    if (isAuth()) {
      history.replace("tabs");
    }
  }, [user]);

  const formik = useFormik({
    validationSchema: validateData,
    initialValues: {
      user: "",
      password: "",
    },
    onSubmit: (values) => {
      handleLogout();
      present({
        message: "Connexion...",
      });
      post(endPoint.login, values, login, dismiss, setError);
    },
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <IonPage>
      <IonContent>
        <Container sizeMd={"4"}>
          <div className="d-flex justify-content-center">
            <img
              className="welcome-img p-2"
              width={"50%"}
              src={logo}
              alt="logo enumera"
            />
          </div>
          <h1 className="text-center ion-text-uppercase fs-5   fw-bold m-0 mt-4">
            Connexion
          </h1>
          {error && (
            <div className="text-danger fw-bold text-center">{error}</div>
          )}
          <IonGrid>
            <IonRow>
              <Input
                type={"email"}
                label={"Numéro matricule ou de téléphone"}
                placeholder={"Entrez votre numéro matricule ou de téléphone"}
                formik={formik}
                name={"user"}
              >
                <span slot="start" className="pe-">
                  <IdSvg />
                </span>
              </Input>
              <Input
                type={"password"}
                label={"Mot de passe"}
                placeholder={"Entrez votre mot de passe"}
                formik={formik}
                name={"password"}
              >
                <span slot="start" className="p- i-24 m-">
                  <LockSvg />
                </span>
                <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
              </Input>
            </IonRow>
          </IonGrid>
          <div className="d-flex ion-justify-content-center my-3">
            <IonButton
              onClick={(e: any) => formik.handleSubmit(e)}
              shape="round"
              color={"primary"}
              className="w-75"
              //id="open-loading"
            >
              Se connecter
            </IonButton>
          </div>
          <div className="d-flex ion-justify-content-center my-3">
            <IonLoading
              trigger="open-loading"
              message="Connexion..."
              spinner="circles"
            />
          </div>
          <div className="text-center">
            <span>Vous n'avez pas de compte ?</span> <br />
            <span
              className="text-primary fw-bold"
              onClick={(e) => {
                e.preventDefault();
                history.push("register");
              }}
            >
              Inscrivez-vous ici
            </span>
          </div>
          <div>
            <div className="text-center my-1 text-12 fw-bold">
              Nos Partenaires
            </div>
            <div className="d-flex flex-wrap justify-content-center mt-2">
              <img
                className="border border-gray mb-1 mx-2"
                width={"54px"}
                src={enumera}
              />
              <img
                className="border border-gray mb-1 mx-2"
                width={"54px"}
                src={sos}
              />
              <img
                className="border border-gray mb-1 mx-2"
                width={"54px"}
                src={kamalpha}
              />
              <img
                className="border border-gray mb-1 mx-2"
                width={"54px"}
                src={armories}
              />
            </div>
          </div>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
