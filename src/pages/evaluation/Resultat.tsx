import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSkeletonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { notifications, chevronDown, chevronForward } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import {
  ClasseSvg,
  BookSvg,
  SuccessSvg,
  LessonSvg,
  Container,
  LinkList,
} from "../../components";
import { useAuth, useDataProvider, useNavigate, useRequest } from "../../hooks";
import { endPoint } from "../../services";
import { useHistory, useParams } from "react-router";
import useFunction from "../../hooks/useFunction";
import ResultatSvg from "../../components/svg/ResultatSvg";

const Resultat = () => {
  const { user } = useAuth();
  const [section, setSection] = useState(0);
  const [datas, setDatas] = useState<any>([]);
  const [periodes, setPeriodes] = useState<any>([]);
  const [classes, setClasses] = useState<any>([]);
  const { get } = useRequest();
  const { navigate } = useNavigate();
  const modalPeriode = useRef<HTMLIonModalElement>(null);
  const modalClasse = useRef<HTMLIonModalElement>(null);
  const { dataShared }: any = useDataProvider();
  const { classeSlug, matiereSlug, periodeSlug }: any = useParams();
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();
  const [pourcentage, setPourcentage]: any = useState(0);
  const [viewPourcentage, setViewPourcentage] = useState("");

  useEffect(() => {
    get(
      endPoint.chapitres +
        `/classe/${classeSlug}/periode/${periodeSlug}/matiere/${matiereSlug}`,
      setDatas,
      setLoaded
    );

    let point: any = sessionStorage.getItem("point");
    let quotient: any = sessionStorage.getItem("quotient");

    const result = (parseInt(point) * 100) / parseInt(quotient);
    setPourcentage(result);
  }, [user]);

  const changeSection = (e: any, name: any) => {
    e.preventDefault();
    setSection(name);
  };

  const getMessage = (score: any) => {
    if (score < 50) {
      return (
        <span className="text-danger">
          Tu peux mieux faire. Révise la leçon attentivement avant de retenter
          l'exercice.
        </span>
      );
    } else if (score === 50) {
      return (
        <span className="text-success">
          C’est bien, mais il y a encore des points à améliorer. Reprends
          l’exercice pour progresser.
        </span>
      );
    } else if (score > 50 && score < 75) {
      return (
        <span className="text-success">
          Bon travail ! Continue à t’entraîner pour atteindre un niveau encore
          meilleur.
        </span>
      );
    } else if (score >= 75 && score < 100) {
      return (
        <span style={{ color: "#A5B68D" }}>
          Très bien ! Tu es sur la bonne voie, mais il reste encore un peu de
          marge pour t’améliorer.
        </span>
      );
    } else if (score === 100) {
      return (
        <span style={{ color: "#A5B68D" }}>
          Excellent ! Bravo à toi, continue comme ça pour maintenir ce niveau !
        </span>
      );
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <Container>
          <IonToolbar>
            <IonButtons slot="start">
              <div className="d-flex align-items-center">
                <img
                  className="rounded-5"
                  width={"48px"}
                  src="https://picsum.photos/400/?random"
                />
                <div className="ms-2 line-height">
                  <div className="fw-bold text-uppercase text-14 line-height">
                    {user?.nom + " " + user?.prenom}
                  </div>
                  <div className="text-12 text-muted">12/05/2024</div>
                </div>
              </div>
            </IonButtons>
            {/** */}
            <IonTitle></IonTitle>
            <IonButtons slot="end">
              <IonButton className="back-circle">
                <IonIcon
                  color="medium"
                  className="text-24"
                  icon={notifications}
                />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </Container>
      </IonHeader>
      <IonContent>
        <Container>
          <div className="container-fluid">
            <div className="row mt-2">
              <div className="fw-bold fs-1 text-uppercase text-center text-primary my-5">
                Resultat
              </div>
              <div className="d-flex justify-content-center">
                <ResultatSvg />
              </div>
              <div className="fw-bold fs-5 text-uppercase text-center text-primary mt-5 mb-3">
                {getMessage(pourcentage)}
              </div>
              <div className="text-center">
                vous avez obtenu une note de{" "}
                {pourcentage < 50 ? (
                  <span className="text-danger fw-bold">
                    {parseInt(pourcentage) + "%"}
                  </span>
                ) : (
                  <>
                    {pourcentage <= 75 ? (
                      <span className="text-success fw-bold">
                        {parseInt(pourcentage) + "%"}
                      </span>
                    ) : (
                      <span className="fw-bold" style={{color:"#A5B68D"}}>
                        {parseInt(pourcentage) + "%"}
                      </span>
                    )}
                  </>
                )}
              </div>
              <div className="fw-bold fs-1 text-uppercase text-center text-primary mt-3 mb-3">
                {sessionStorage.getItem("point")}/
                {sessionStorage.getItem("quotient")}
              </div>
              <div className="text-center text-primary fw-bold">
                Voir les corrections
              </div>
              <div className="d-flex justify-content-center mt-5">
                <IonButton
                  className="w-75"
                  shape="round"
                  onClick={(e) => {
                    e.preventDefault();
                    history.goBack();
                  }}
                >
                  Retour
                </IonButton>
              </div>
            </div>
          </div>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Resultat;
