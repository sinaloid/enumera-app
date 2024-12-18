import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  IonIcon,
  IonSkeletonText,
  IonButton,
} from "@ionic/react";
import { calendar } from "ionicons/icons";
import { Retour } from "../../components/Retour";
import "./MessageList.css";
import { useRequest } from "../../hooks";
import { endPoint } from "../../services";
import { useHistory } from "react-router";
import { Container } from "../../components";

// Simuler un chargement des données d'événements (normalement cela viendrait d'une API)
const fetchEvenements = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          titre: "Lancement de l'application Wifolo 🎉",
          contenu:
            "<p>Rejoignez-nous pour célébrer le lancement officiel de Wifolo !</p>",
          dateDebut: "2024-07-01",
          dateFin: "2024-07-01",
        },
        {
          id: 2,
          titre: "Atelier de révision pour le BAC",
          contenu:
            "<p>Une journée entière dédiée aux révisions des matières essentielles pour les terminales.</p>",
          dateDebut: "2024-08-15",
          dateFin: "2024-08-16",
        },
        {
          id: 3,
          titre: "Conférence des parents et enseignants",
          contenu:
            "<p>Échangez avec les enseignants pour discuter des performances et besoins des élèves.</p>",
          dateDebut: "2024-09-10",
          dateFin: "2024-09-10",
        },
      ]);
    }, 2000); // Simule un délai de 2 secondes pour le chargement
  });
};

const MessageList: React.FC = () => {
  const [evenements, setEvenements] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [datas, setDatas] = useState<any[]>([]);
  const { get } = useRequest();
  const history = useHistory();

  useEffect(() => {
    // Chargement des événements au montage du composant
    fetchEvenements().then((data: any) => {
      setEvenements(data);
      setLoading(false);
    });
    get(endPoint.messagesDefilants, setDatas, setLoading);
  }, []);

  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  // Fonction pour gérer l'expansion du contenu
  const toggleExpanded = (id: number) => {
    setExpanded((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      return newExpanded;
    });
  };

  // Fonction pour couper le contenu à une certaine longueur
  const truncateContent = (content: string, length: number) => {
    const text = content.replace(/<\/?[^>]+(>|$)/g, ""); // Enlever les balises HTML
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <IonPage>
      {/* En-tête */}
      <IonHeader>
        <IonToolbar color="primary">
          <Container>
            <IonTitle>Actualités & Événements</IonTitle>
          </Container>
        </IonToolbar>
      </IonHeader>

      {/* Contenu */}
      <IonContent className="ion-padding">
        <Container>
          {/* Bouton Retour */}
          <div>
            <Retour />
          </div>

          {/* Liste des événements */}
          <IonList>
            {loading ? (
              // Affichage du skeleton loader pendant le chargement
              <>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>
                      <IonSkeletonText animated style={{ width: "80%" }} />
                    </IonCardTitle>
                    <IonCardSubtitle>
                      <IonSkeletonText animated style={{ width: "60%" }} />
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonSkeletonText animated style={{ width: "100%" }} />
                  </IonCardContent>
                </IonCard>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>
                      <IonSkeletonText animated style={{ width: "80%" }} />
                    </IonCardTitle>
                    <IonCardSubtitle>
                      <IonSkeletonText animated style={{ width: "60%" }} />
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonSkeletonText animated style={{ width: "100%" }} />
                  </IonCardContent>
                </IonCard>
              </>
            ) : (
              // Une fois les événements chargés, on les affiche
              datas.map((data) => (
                <IonCard
                  key={data.id}
                  onClick={(e) => {
                    e.preventDefault();
                    history.push("messages/" + data.slug);
                  }}
                >
                  <IonCardHeader>
                    <IonCardTitle>{data.titre}</IonCardTitle>
                    <IonCardSubtitle>
                      <div className="d-flex justify-content-between">
                        <div className="bg-primary-light text-primary px-3 rounded-1 ms-auto">
                          {data.type}
                        </div>
                      </div>
                      <div>
                        <IonIcon icon={calendar} color="medium" />
                        {"  "}
                        Du <strong>{data.date_debut}</strong> au{" "}
                        <strong>{data.date_fin}</strong>
                      </div>
                    </IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {/* Si l'événement est expansé, on affiche tout le contenu */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `${truncateContent(
                          data.contenu,
                          200
                        )} <strong class="text-primary fw-bold">Voir plus</strong>`,
                      }}
                    ></div>
                  </IonCardContent>
                </IonCard>
              ))
            )}
          </IonList>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default MessageList;
