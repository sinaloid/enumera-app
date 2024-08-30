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

  useEffect(() => {
    get(
      endPoint.chapitres +
        `/classe/${classeSlug}/periode/${periodeSlug}/matiere/${matiereSlug}`,
      setDatas,
      setLoaded
    );
  }, [user]);

  const changeSection = (e: any, name: any) => {
    e.preventDefault();
    setSection(name);
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
              <div className="fw-bold fs-1 text-uppercase text-center text-primary mt-5 mb-3">
                Bravo
              </div>
              <div className="text-center">vous avez obtenu une note de</div>
              <div className="fw-bold fs-1 text-uppercase text-center text-primary mt-3 mb-3">
                {localStorage.getItem('point')}
              </div>
              <div className="text-center text-primary fw-bold">
                Voir les corrections
              </div>
              <div className="d-flex justify-content-center mt-5">
              <IonButton
                className="w-75"
                shape="round"
                onClick={(e) => {
                  e.preventDefault()
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
