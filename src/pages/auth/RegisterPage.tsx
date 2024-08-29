import "./Login.css";
import logo from "../../assets/images/logo.png";
import {
  IonButton,
  IonCheckbox,
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
  IonSelect,
  IonSelectOption,
  IonSpinner,
  useIonLoading,
} from "@ionic/react";
import { lockClosed } from "ionicons/icons";
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
const validateData = Yup.object({
  nom: Yup.string().required(
    "Ce champ est obligatoire. Veuillez le remplir pour continuer"
  ),
  prenom: Yup.string().required(
    "Ce champ est obligatoire. Veuillez le remplir pour continuer"
  ),
  date_de_naissance: Yup.string().required(
    "Ce champ est obligatoire. Veuillez le remplir pour continuer"
  ),
  genre: Yup.string().required(
    "Ce champ est obligatoire. Veuillez le remplir pour continuer"
  ),
  classe: Yup.string().required(
    "Ce champ est obligatoire. Veuillez le remplir pour continuer"
  ),
  telephone: Yup.string().required(
    "Ce champ est obligatoire. Veuillez le remplir pour continuer"
  ),
  email: Yup.string().required(
    "Ce champ est obligatoire. Veuillez le remplir pour continuer"
  ),
  password: Yup.string()
    .min(8, "Le mot de passe doit contenir 8 caractères ou moins")
    .required("Ce champ est obligatoire. Veuillez le remplir pour continuer"),
  password_confirm: Yup.string()
    .min(8, "Le mot de passe doit contenir 8 caractères ou moins")
    .required("Ce champ est obligatoire. Veuillez le remplir pour continuer"),
});
const RegisterPage: React.FC = () => {
  const history = useHistory();
  const { user, login, logout, isAuth } = useAuth();
  const { get, createCompte } = useRequest();
  const [present, dismiss] = useIonLoading();
  const [error, setError] = useState("");
  const [classes, setClasses] = useState([]);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    if (isCreated) {
      history.push("verify-otp");
    } else {
      get(endPoint.classes + "/public", setClasses);
    }
  }, [isCreated]);

  const formik = useFormik({
    validationSchema: validateData,
    initialValues: {
      nom: "",
      prenom: "",
      date_de_naissance: "",
      telephone: "",
      genre: "",
      profile: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      //handleLogout();
      values.profile = "ELEVE";
      present({
        message: "Creation de votre compte...",
      });
      console.log(values);
      createCompte(endPoint.register, values, setIsCreated, dismiss, setError);
    },
  });

  const handleLogout = () => {
    logout();
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
            Inscription
          </h1>
          {error && (
            <div className="text-danger fw-bold text-center">{error}</div>
          )}
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonCheckbox labelPlacement="end" checked>
                  Elève
                </IonCheckbox>
              </IonCol>
              <IonCol size="12">
                <IonCheckbox labelPlacement="end" disabled>
                  Parent
                </IonCheckbox>
              </IonCol>
              <IonCol size="12">
                <IonCheckbox labelPlacement="end" disabled>
                  Enseignant
                </IonCheckbox>
              </IonCol>
              <Input
                type={"text"}
                label={"Nom"}
                placeholder={"Entrez votre nom"}
                formik={formik}
                name={"nom"}
              >
                <span slot="start" className="pe-">
                  <IdSvg />
                </span>
              </Input>
              <Input
                type={"text"}
                label={"Prénom"}
                placeholder={"Entrez votre prénom"}
                formik={formik}
                name={"prenom"}
              >
                <span slot="start" className="pe-">
                  <IdSvg />
                </span>
              </Input>
              <Input
                type={"date"}
                label={"Date de naissance"}
                placeholder={"Entrez votre date de naissance"}
                formik={formik}
                name={"date_de_naissance"}
              >
                <span slot="start" className="pe-">
                  <IdSvg />
                </span>
              </Input>
              <IonSelect
                label="Genre"
                placeholder="Selectionnez votre genre"
                onIonChange={(e) => {
                  //console.log(e)
                  formik.setFieldValue("genre", e.detail.value);
                }}
              >
                {[
                  { slug: "M", label: "Homme" },
                  { slug: "F", label: "Femme" },
                ].map((data) => {
                  return (
                    <IonSelectOption key={data.slug} value={data.slug}>
                      {data.label}
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
              <IonSelect
                label="Classe"
                placeholder="Selectionnez votre classe"
                onIonChange={(e) =>
                  formik.setFieldValue("classe", e.detail.value)
                }
              >
                {classes.map((data: any) => {
                  return (
                    <IonSelectOption key={data.slug} value={data.slug}>
                      {data.label}
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
              <Input
                type={"text"}
                label={"Numéro de téléphone"}
                placeholder={"Entrez votre numéro de téléphone"}
                formik={formik}
                name={"telephone"}
              >
                <span slot="start" className="pe-">
                  <IdSvg />
                </span>
              </Input>
              <Input
                type={"email"}
                label={"Email"}
                placeholder={"Entrez votre email"}
                formik={formik}
                name={"email"}
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
              <Input
                type={"password"}
                label={"Confirmeez votre mot de passe"}
                placeholder={"Entrez votre mot de passe"}
                formik={formik}
                name={"password_confirm"}
              >
                <span slot="start" className="p- i-24 m-">
                  <LockSvg />
                </span>
                <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
              </Input>
            </IonRow>
          </IonGrid>
          {error && (
            <div className="text-danger fw-bold text-center">{error}</div>
          )}
          <div className="d-flex ion-justify-content-center my-3">
            <IonButton
              onClick={(e: any) => formik.handleSubmit(e)}
              shape="round"
              color={"primary"}
              className="w-75"
              //id="open-loading"
            >
              S'inscrire
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
            <span>Vous avez déjà un compte ?</span> <br />
            <span
              className="text-primary fw-bold"
              onClick={(e) => {
                e.preventDefault();
                history.push("login");
              }}
            >
              Connectez-vous ici
            </span>
          </div>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
