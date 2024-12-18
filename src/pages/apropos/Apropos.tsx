import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonListHeader,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
} from "@ionic/react";
import {
  book,
  school,
  statsChart,
  phonePortrait,
  playCircle,
  cloudDownload,
  people,
  helpCircle,
  mail,
  call,
} from "ionicons/icons";
import "./Apropos.css";
import { Retour } from "../../components/Retour";
import { useHistory } from "react-router";
import { Container } from "../../components";

const Apropos: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      {/* En-tête */}
      <IonHeader>
        <IonToolbar color="primary">
          <Container>
            <IonTitle>À Propos</IonTitle>
          </Container>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Titre principal */}
        <Container>
          <div>
            <Retour />
          </div>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle className="ion-text-center">
                🌟 Bienvenue sur <strong>Wifolo</strong> !
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="ion-text-center">
              La plateforme d'apprentissage en ligne conçue pour les élèves de
              la <strong>6ème</strong> à la <strong>Terminale</strong>, ainsi
              que pour les <strong>parents d'élèves</strong> et les{" "}
              <strong>enseignants</strong> !
            </IonCardContent>
          </IonCard>

          {/* Pourquoi choisir */}
          <IonList>
            <IonListHeader>
              <h2>
                🚀 Pourquoi choisir <strong>Wifolo</strong> ?
              </h2>
            </IonListHeader>

            <IonItem>
              <IonIcon icon={book} slot="start" color="secondary" />
              <IonLabel>
                <h3>Cours complets et organisés</h3>
                <p>
                  Des cours rédigés par des enseignants couvrant toutes les
                  matières.
                </p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonIcon icon={school} slot="start" color="secondary" />
              <IonLabel>
                <h3>Exercices et quiz interactifs</h3>
                <p>Testez vos connaissances avec des corrections détaillées.</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonIcon icon={statsChart} slot="start" color="secondary" />
              <IonLabel>
                <h3>Suivi de progression</h3>
                <p>Analysez vos progrès grâce à des statistiques claires.</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonIcon icon={phonePortrait} slot="start" color="secondary" />
              <IonLabel>
                <h3>Accessibilité partout</h3>
                <p>Disponible sur smartphone, tablette et ordinateur.</p>
              </IonLabel>
            </IonItem>
          </IonList>

          {/* Notre Mission */}
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>🎯 Notre Mission</IonCardSubtitle>
              <IonCardTitle>Faciliter votre réussite scolaire</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>
                Chez <strong>Wifolo</strong>, nous croyons que chaque élève
                mérite un accompagnement éducatif moderne et accessible. Notre
                objectif est de :
              </p>
              <ul>
                <li>
                  🎓 <strong>Accompagner les élèves</strong> dans leur
                  progression académique.
                </li>
                <li>
                  👨‍👩‍👧‍👦 <strong>Assister les parents</strong> avec des outils de
                  suivi des performances.
                </li>
                <li>
                  👩‍🏫 <strong>Soutenir les enseignants</strong> dans la
                  préparation de cours et le suivi des élèves.
                </li>
              </ul>
            </IonCardContent>
          </IonCard>

          {/* Fonctionnalités principales */}
          <IonList>
            <IonListHeader>
              <h2>✨ Fonctionnalités Principales</h2>
            </IonListHeader>

            <IonItem>
              <IonIcon icon={playCircle} slot="start" color="success" />
              <IonLabel>Cours interactifs avec vidéos et résumés.</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={helpCircle} slot="start" color="success" />
              <IonLabel>Quiz en temps réel pour valider vos acquis.</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={cloudDownload} slot="start" color="success" />
              <IonLabel>Accès hors ligne pour réviser sans connexion.</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={people} slot="start" color="success" />
              <IonLabel>Forum d'entraide pour poser vos questions.</IonLabel>
            </IonItem>
          </IonList>

          {/* Appel à action */}
          <div className="ion-text-center ion-margin-top">
            <h2>Prêt à réussir ?</h2>
            <p>
              Transformez votre façon d'apprendre avec <strong>Wifolo</strong> !
            </p>
            <IonButton
              color="primary"
              expand="block"
              shape="round"
              onClick={(e) => {
                e.preventDefault();
                history.push("login");
              }}
            >
              Connectez-vous Maintenant
            </IonButton>
            <div className="fw-bold">ou</div>
            <IonButton
              color="primary"
              expand="block"
              shape="round"
              onClick={(e) => {
                e.preventDefault();
                history.push("register");
              }}
            >
              Inscrivez-vous Maintenant
            </IonButton>
          </div>

          {/* Contact */}
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>📧 Contactez-nous</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent className="ion-text-center">
              <p>
                Une question ? Une suggestion ? Écrivez-nous à :<br />
                <IonIcon icon={mail} color="primary" />
                <strong>
                  <a href="mailto:info@wifolo.com" className="text-primary">
                    {" "}
                    info@wifolo.com
                  </a>
                </strong>
              </p>
              <p className="my-1">
                📞 Appelez-nous :<br />
                <IonIcon icon={call} color="primary" />
                <strong>
                  <a href="tel:+22655878701" className="text-primary">
                    {" "}
                    +226 55 87 87 01
                  </a>
                </strong>
                <br />
                <IonIcon icon={call} color="primary" />
                <strong>
                  <a href="tel:+22661656572" className="text-primary">
                    +226 61 65 65 72
                  </a>
                </strong>
              </p>
            </IonCardContent>
          </IonCard>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Apropos;
