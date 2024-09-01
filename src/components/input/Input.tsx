import {
  IonButton,
  IonCol,
  IonDatetime,
  IonDatetimeButton,
  IonInput,
  IonModal,
} from "@ionic/react";
import IdSvg from "../svg/IdSvg";
import { useRef, useState } from "react";

interface ContainerProps {
  type: any;
  label: any;
  placeholder: any;
  children: any;
  formik: any;
  name: any;
}
const Input: React.FC<ContainerProps> = ({
  type,
  label,
  placeholder,
  children,
  formik,
  name,
}) => {
  const [showModal, setShowModal] = useState(false);

  if (type === "text") {
    return (
      <>
        <IonCol size="12">
          <div className="my-2">{label}</div>
          <IonInput
            className="custom-input"
            type="text"
            placeholder={placeholder}
            fill="outline"
            name={name}
            onIonInput={formik.handleChange}
            onIonBlur={formik.handleBlur}
            value={formik.values[name]}
          >
            {children}
          </IonInput>
          {formik.touched[name] && formik.errors[name] ? (
            <div className="text-danger">{formik.errors[name]}</div>
          ) : null}
        </IonCol>
      </>
    );
  }

  if (type === "date") {
    return (
      <>
        <IonCol>
          <div className="my-2">{label}</div>
          <div className="d-flex">
            <IonDatetimeButton
              datetime="datetime"
              onClick={() => setShowModal(true)} // Ouvrir le modal en cliquant sur le bouton
            ></IonDatetimeButton>
          </div>

          <IonModal
            isOpen={showModal}
            keepContentsMounted={true}
            onDidDismiss={() => setShowModal(false)} // Fermer le modal si on clique en dehors ou sur le bouton "Fermer"
          >
            <IonDatetime
              id="datetime"
              presentation="date" // Désactiver la sélection de l'heure
              //value={formik.values[name]} // Liaison de la valeur à Formik
              onIonChange={(e) => formik.setFieldValue(name, e.detail.value)} // Mise à jour de Formik à chaque changement de date
              //displayFormat="DD/MM/YYYY"
              value={"2009-01-01"}
            />
            <div className="d-flex justify-content-center">
              <IonButton
                onClick={() => setShowModal(false)} // Fermer le modal
                color="primary"
                fill="outline"
              >
                Fermer
              </IonButton>

              <IonButton
                color="primary"
                onClick={() => {
                  setShowModal(false); // Fermer le modal après validation
                }}
              >
                Valider
              </IonButton>
            </div>
          </IonModal>

          {formik.touched[name] && formik.errors[name] ? (
            <div className="text-danger">{formik.errors[name]}</div>
          ) : null}
        </IonCol>
      </>
    );
  }

  if (type === "email") {
    return (
      <>
        <IonCol size="12">
          <div className="my-2">{label}</div>
          <IonInput
            className="custom-input"
            type="email"
            placeholder={placeholder}
            fill="outline"
            name={name}
            onIonInput={formik.handleChange}
            onIonBlur={formik.handleBlur}
            value={formik.values[name]}
          >
            {children}
          </IonInput>
          {formik.touched[name] && formik.errors[name] ? (
            <div className="text-danger">{formik.errors[name]}</div>
          ) : null}
        </IonCol>
      </>
    );
  }

  if (type === "password") {
    return (
      <>
        <IonCol size="12">
          <div className="my-2">{label}</div>
          <IonInput
            className="custom-input"
            type="password"
            placeholder={placeholder}
            fill="outline"
            name={name}
            onIonInput={formik.handleChange}
            onIonBlur={formik.handleBlur}
            value={formik.values[name]}
          >
            {children}
          </IonInput>
          {formik.touched[name] && formik.errors[name] ? (
            <div className="text-danger">{formik.errors[name]}</div>
          ) : null}
        </IonCol>
      </>
    );
  }
};

export default Input;
