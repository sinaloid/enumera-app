import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonText,
  IonBadge,
} from "@ionic/react";
import { checkmarkCircle, closeCircle, helpCircle } from "ionicons/icons";
import { Retour } from "../../components/Retour";
import { Container } from "../../components";
//import "./CorrectionPage.css";

// Données des corrections
const corrections = [
  {
    id: 41,
    question: "a) Les points A, O et D sont alignés.",
    choix: ["Vrai", "Faux"],
    type: "CHOIX_SIMPLE",
    reponses: "2",
    point: "1",
    slug: "QwRTR5WmcR",
    is_deleted: 0,
    evaluation_lecon_id: 12,
    created_at: "2024-11-19T16:46:29.000000Z",
    updated_at: "2024-11-19T16:46:29.000000Z",
    user_reponse: [1],
    user_point: "0",
  },
  {
    id: 42,
    question: "b) O est élément du [AB].",
    choix: ["Vrai", "Faux"],
    type: "CHOIX_SIMPLE",
    reponses: "1",
    point: "1",
    slug: "aog66ykCdx",
    is_deleted: 0,
    evaluation_lecon_id: 12,
    created_at: "2024-11-19T16:46:56.000000Z",
    updated_at: "2024-11-19T16:55:42.000000Z",
    user_reponse: ["Pas de réponse"],
    user_point: "0",
  },
  // Ajoutez les autres corrections ici...
];

const Correction: React.FC = () => {
  const [corrections, setCorrections] = useState([]);
  useEffect(() => {
    let user_response: any = sessionStorage.getItem("user_response");
    user_response = JSON.parse(user_response);
    setCorrections(user_response);
  }, []);
  return (
    <IonPage>
      {/* En-tête */}
      <IonHeader>
        <IonToolbar color="primary">
          <Container>
            <IonTitle>Correction</IonTitle>
          </Container>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Container>
          {/* Bouton Retour */}
        <div>
          <Retour />
        </div>

        {/* Liste des corrections */}
        <IonList>
          {corrections.map((correction: any, idx: any) => (
            <IonCard key={correction.id}>
              <IonCardHeader>
                <IonCardTitle>Question {idx + 1}</IonCardTitle>
                <IonCardSubtitle>{correction.question}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                {/* Affichage des réponses */}
                <IonList>
                  <IonItem>
                    <IonLabel>
                      <h3>Vos choix :</h3>
                      <IonText>
                        {correction.user_reponse[0] !== "Pas de réponse" ? (
                          <>
                            {correction.type === "REPONSE_SAISIE"
                              ? correction.user_reponse
                              : correction.choix[
                                  correction?.user_reponse[0] - 1
                                ]}
                          </>
                        ) : (
                          "Aucune réponse"
                        )}
                      </IonText>
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>
                      <h3>Réponse correcte :</h3>
                      <IonText color="success">
                        {correction.type === "REPONSE_SAISIE"
                          ? correction.choix
                          : correction.choix[parseInt(correction.reponses) - 1]}
                      </IonText>
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonLabel>
                      <h3>Point obtenu :</h3>
                      <IonBadge
                        color={
                          correction.user_point === "1" ? "success" : "danger"
                        }
                      >
                        {correction.user_point}
                      </IonBadge>
                    </IonLabel>
                  </IonItem>
                </IonList>

                {/* Indicateur du statut de la réponse */}
                <div className="ion-text-center ion-margin-top">
                  {correction.user_point === "1" ? (
                    <IonIcon
                      icon={checkmarkCircle}
                      size="large"
                      color="success"
                    />
                  ) : (
                    <IonIcon icon={closeCircle} size="large" color="danger" />
                  )}
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Correction;
