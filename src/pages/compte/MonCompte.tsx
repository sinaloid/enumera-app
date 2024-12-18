import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAvatar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonModal,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useFormik } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import profile from "../../assets/images/logo.png";
import { AppContext } from "../../context/context";
import { request, endPoint } from "../../services";
import { Container } from "../../components";
import { ContentHeader } from "../../components/ContentHeader";
import { Retour } from "../../components/Retour";

const initdata = {
  email: "",
  password: "",
  oldPassword: "",
  numeroTelephone: "",
};

export const MonCompte: React.FC = () => {
  const authCtx = useContext(AppContext);
  const { user } = authCtx;
  const [userInfo, setUserInfo]: any = useState<any>({});
  const [message, setMessage]: any = useState("");
  const closeEditImage = useRef<HTMLIonModalElement | null>(null);

  const header = {
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const formik: any = useFormik({
    initialValues: initdata,
    onSubmit: (values) => {
      values.email = userInfo.email || "";
      values.numeroTelephone = userInfo.numeroTelephone || "";
      updateUser(values);
    },
  });

  const formikImage: any = useFormik({
    initialValues: { image: "" },
    onSubmit: (values) => {
      updateProfileImage(values);
    },
  });

  const formikPassword: any = useFormik({
    initialValues: { password: "", oldPassword: "" },
    onSubmit: (values) => {
      updatePassword(values);
    },
  });

  const getUserInfo = () => {
    request
      .get(`${endPoint.utilisateurs}/auth/infos`, header)
      .then((res) => {
        const data = res.data.data;
        setUserInfo(data);
        formik.setValues({
          email: data.email || "",
          numeroTelephone: data.telephone || "",
          password: "",
          oldPassword: "",
        });
      })
      .catch((error) => console.error(error));
  };

  const updateUser = (values: any) => {
    request
      .put(`${endPoint.utilisateurs}/${userInfo.id}`, values, header)
      .then((res) => {
        //toast.success("Informations mises à jour avec succès");
        getUserInfo();
      })
      .catch((error: any) => {
        console.log(error);
        //toast.error("Erreur lors de la mise à jour")
      });
  };

  const updateProfileImage = (values: any) => {
    request
      .post(`${endPoint.utilisateurs}/auth/image`, values, header)
      .then(() => {
        //toast.success("Image de profil mise à jour");
        closeEditImage.current?.dismiss();
        getUserInfo();
      })
      .catch(() => {
        //toast.error("Erreur lors de la mise à jour de l'image")
      });
  };

  const updatePassword = (values: any) => {
    request
      .post(`${endPoint.utilisateurs}/auth/password`, values, header)
      .then(() => {
        //toast.success("Mot de passe modifié avec succès");
      })
      .catch(() => {
        //toast.error("Erreur lors de la modification du mot de passe")
      });
  };

  return (
    <IonPage>
      <ContentHeader idPopover={"monCompte"} />

      <IonContent className="ion-padding">
        <Container>
          <div>
            <Retour />
          </div>
          <div className="profile-section">
            <IonAvatar
              className="ion-margin-bottom"
              style={{ margin: "0 auto" }}
            >
              <img
                src={userInfo.image ? `${URL}/${userInfo.image}` : profile}
                alt="Profile"
              />
            </IonAvatar>
            <IonButton
              expand="block"
              onClick={() => closeEditImage.current?.present()}
            >
              Modifier la photo
            </IonButton>
          </div>

          <IonList>
            <IonItem>
              <IonLabel position="stacked">Nom</IonLabel>
              <IonInput
                value={userInfo.nom || ""}
                onIonChange={(e) =>
                  formik.setFieldValue("nom", e.detail.value!)
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Prénom</IonLabel>
              <IonInput
                value={userInfo.prenom || ""}
                onIonChange={(e) =>
                  formik.setFieldValue("prenom", e.detail.value!)
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput
                value={formik.values.email}
                onIonChange={(e) =>
                  formik.setFieldValue("email", e.detail.value!)
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Téléphone</IonLabel>
              <IonInput
                value={formik.values.numeroTelephone}
                onIonChange={(e) =>
                  formik.setFieldValue("numeroTelephone", e.detail.value!)
                }
              />
            </IonItem>
          </IonList>
          <IonButton expand="block" onClick={formik.handleSubmit}>
            Enregistrer les modifications
          </IonButton>

          <IonList>
            <IonItem>
              <IonLabel position="stacked">Ancien mot de passe</IonLabel>
              <IonInput
                type="password"
                onIonChange={(e) =>
                  formikPassword.setFieldValue("oldPassword", e.detail.value!)
                }
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Nouveau mot de passe</IonLabel>
              <IonInput
                type="password"
                onIonChange={(e) =>
                  formikPassword.setFieldValue("password", e.detail.value!)
                }
              />
            </IonItem>
          </IonList>
          <IonButton expand="block" onClick={formikPassword.handleSubmit}>
            Modifier le mot de passe
          </IonButton>

          {/* Modal for editing profile image */}
          <IonModal ref={closeEditImage}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Modifier l'image de profil</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => closeEditImage.current?.dismiss()}>
                    Fermer
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonLabel position="stacked">Choisissez une image</IonLabel>
              <IonInput
                type="file"
                onIonChange={(e: any) =>
                  formikImage.setFieldValue("image", e.target.files[0])
                }
              />
              <IonButton expand="block" onClick={formikImage.handleSubmit}>
                Enregistrer
              </IonButton>
            </IonContent>
          </IonModal>
        </Container>
      </IonContent>
    </IonPage>
  );
};
