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
  email: Yup.string().required(
    "Ce champ est obligatoire. Veuillez le remplir pour continuer"
  ),
  otp: Yup.string()
    .min(6, "Le code otp doit contenir 6 caractères ou moins")
    .required("Ce champ est obligatoire. Veuillez le remplir pour continuer"),
});
const VerifyOtpPage: React.FC = () => {
  const history = useHistory();
  const { user, login, logout, isAuth } = useAuth();
  const { getOtp, verifyOtp } = useRequest();
  const [present, dismiss] = useIonLoading();
  const [error, setError] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    if (isCreated) {
      history.push("login");
    } 

    formik.setFieldValue("email", localStorage.getItem("email"));
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
      present({
        message: "Vérification du code OTP...",
      });
      console.log(values);
      verifyOtp("verify-otp", values, setIsCreated, dismiss, setError);
    },
  });

  const handleOtp = () => {
    present({
      message: "Envoi du code OTP...",
    });
    getOtp('get-otp',{email:formik.values['email']}, dismiss, setError);
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
            Verification du code OTP
          </h1>
          <p className="text-center">
            Veuillez entre le code OTP que nous avons envoyer a votre adresse
            mail <br />{" "}
            <span className="text-primary fw-bold">
              {formik.values["email"]}
            </span>
          </p>
          {error && (
            <div className="text-danger fw-bold text-center">{error}</div>
          )}
          <IonGrid>
            <IonRow>
              <Input
                type={"text"}
                label={"Code OTP"}
                placeholder={"Entrez votre le code OTP"}
                formik={formik}
                name={"otp"}
              >
                <span slot="start" className="pe-">
                  <IdSvg />
                </span>
              </Input>
              <IonCol>
                <span className="fw-bold text-primary" onClick={handleOtp}>Renvoyer le code</span>
              </IonCol>
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
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default VerifyOtpPage;
