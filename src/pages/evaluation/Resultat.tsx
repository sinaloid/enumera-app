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
import DynamicSVG from "./DynamicSVG";
import { ContentHeader } from "../../components/ContentHeader";

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
  const [tentative, setTentative] = useState(0);
  const [param_tentative, setParam_tentative]: any = useState(0);

  useEffect(() => {
    get(
      endPoint.chapitres +
        `/classe/${classeSlug}/periode/${periodeSlug}/matiere/${matiereSlug}`,
      setDatas,
      setLoaded
    );

    let point: any = sessionStorage.getItem("point");
    let quotient: any = sessionStorage.getItem("quotient");

    let result = (parseInt(point) * 100) / parseInt(quotient);
    result = Math.floor(result * 100) / 100;
    setPourcentage(result);

    const evaluationEnCours: any = localStorage.getItem("evaluationEnCours");

    let nombreDeTentive: any = localStorage.getItem(evaluationEnCours);
    if (nombreDeTentive) {
      nombreDeTentive = parseInt(nombreDeTentive) + 1;
    } else {
      nombreDeTentive = 1;
    }
    setTentative(nombreDeTentive);
    localStorage.setItem(evaluationEnCours, nombreDeTentive);

    if (localStorage.getItem("nombre_minimum_tentatives_exercice")) {
      setParam_tentative(
        localStorage.getItem("nombre_minimum_tentatives_exercice")
      );
    }
  }, [user]);

  const changeSection = (e: any, name: any) => {
    e.preventDefault();
    setSection(name);
  };

  const getMessage = (score: number) => {
    const messages = [
      {
        condition: (score: number) => score < 50,
        content: (
          <div className="bg-primary-light text-danger p-2 d-inline-block rounded">
            Tu peux mieux faire. Révise la leçon attentivement avant de retenter
            l'exercice.
          </div>
        ),
      },
      {
        condition: (score: number) => score === 50,
        content: (
          <div
            className="text-black p-2 rounded"
            style={{ backgroundColor: "#9dca91" }}
          >
            C’est bien, mais il y a encore des points à améliorer. Reprends
            l’exercice pour progresser.
          </div>
        ),
      },
      {
        condition: (score: number) => score > 50 && score < 75,
        content: (
          <div className="text-black p-2 d-inline-block rounded" style={{ backgroundColor: "#9dca91" }}>
            Bon travail ! Continue à t’entraîner pour atteindre un niveau encore
            meilleur.
          </div>
        ),
      },
      {
        condition: (score: number) => score >= 75 && score < 100,
        content: (
          <div className="bg-gray p-2 d-inline-block rounded" style={{ color: "#41ad48" }}>
            Très bien ! Tu es sur la bonne voie, mais il reste encore un peu de
            marge pour t’améliorer.
          </div>
        ),
      },
      {
        condition: (score: number) => score === 100,
        content: (
          <div className="bg-gray p-2 rounded d-inline-block" style={{ color: "#41ad48" }}>
            Excellent ! Bravo à toi, continue comme ça pour maintenir ce niveau !
          </div>
        ),
      },
    ];
  
    return messages.find((message) => message.condition(score))?.content || null;
  };
  

  return (
    <IonPage>
      <ContentHeader idPopover={"resultat"} />
      <IonContent>
        <Container>
          <div className="container-fluid">
            <div className="row mt-2">
              <div className="fw-bold fs-1 text-uppercase text-center text-primary my-5">
                Resultat
              </div>
              <div className="d-flex justify-content-center">
                {/**<ResultatSvg /> */}
                <DynamicSVG percentage={pourcentage} />
              </div>
              <div className="fw-bold fs-5 text-uppercase text-center text-primary mt-5 mb-3">
                {getMessage(pourcentage)}
              </div>
              <div className="text-center">vous avez obtenu une note de </div>
              <div className="fw-bold fs-1 text-uppercase text-center text-primary mt-3 mb-3">
                {sessionStorage.getItem("point")}/
                {sessionStorage.getItem("quotient")}
              </div>
              {parseInt(param_tentative) <= tentative ? (
                <div className="text-center text-primary fw-bold ">
                  <span className="border border-primary p-1 px-3 rounded-5" onClick={ e => {
                    e.preventDefault()
                    history.push('correction')
                  }}>
                  Voir les corrections
                  </span>
                </div>
              ) : (
                <div className="text-center text-primary fw-bold">
                  Tu as fait l'exercice {tentative} fois
                </div>
              )}

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
