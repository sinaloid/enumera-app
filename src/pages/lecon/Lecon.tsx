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
  ExerciceSvg,
  Container,
  LinkList,
} from "../../components";
import { useAuth, useDataProvider, useNavigate, useRequest } from "../../hooks";
import { endPoint } from "../../services";
import { useParams } from "react-router";
import useFunction from "../../hooks/useFunction";

const Lecon = () => {
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
  const [matiere, setMatiere] = useState<any>("");
  const [chapitre, setChapitre] = useState<any>("");
  const { classeSlug, matiereSlug, periodeSlug, chapitreSlug }: any =
    useParams();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    get(endPoint.lecons + `/chapitre/${chapitreSlug}`, setDatas, setLoaded);
    get(endPoint.chapitres + `/${chapitreSlug}`, setChapitre, setLoaded);
    get(endPoint.matieres + `/${matiereSlug}`, setMatiere, setLoaded);
  }, [user]);
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
            <div className="row mt-2 text-14">
              <div className="text-center fw-bold fs-5">
                <div className="icon-circle bg-primary mx-auto d-flex align-items-center justify-content-center text-white">
                  {matiere?.abreviation}
                </div>
                <div className="my-2">
                {chapitre?.label}
                </div>
              </div>
              <div className="col-12 mt-2 text-14 py-2 text-center bg-gray">
                Messages défilantes : Actualités et évènements
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row mt-2">
              {/**
               * <div className="col-12 px-0">
                <LinkList />
              </div>
               */}
              <div className="col-12 text-center mt-2 mb-3">
                Liste des leçons
              </div>
              {loaded &&
                datas?.map((data: any) => {
                  return <Item data={data} />;
                })}
              {!loaded && <Skeleton />}
            </div>
          </div>
        </Container>
      </IonContent>
    </IonPage>
  );
};

const Skeleton = () => {
  return (
    <>
      {[...Array(10)].map((data, idx) => {
        return (
          <div className="row px-0">
            <IonList className="px-0">
              <IonItem>
                <IonThumbnail slot="start">
                  <IonSkeletonText animated={true}></IonSkeletonText>
                </IonThumbnail>
                <IonLabel>
                  <h3>
                    <IonSkeletonText
                      animated={true}
                      style={{ width: "80%" }}
                    ></IonSkeletonText>
                  </h3>
                  <p>
                    <IonSkeletonText
                      animated={true}
                      style={{ width: "60%" }}
                    ></IonSkeletonText>
                  </p>
                  <p>
                    <IonSkeletonText
                      animated={true}
                      style={{ width: "30%" }}
                    ></IonSkeletonText>
                  </p>
                </IonLabel>
              </IonItem>
            </IonList>
          </div>
        );
      })}
    </>
  );
};

interface ItemProps {
  data: any;
}
const Item: React.FC<ItemProps> = ({ data }) => {
  const { navigate } = useNavigate();
  const { classeSlug, matiereSlug, periodeSlug, chapitreSlug }: any =
    useParams();
  const { updateDataShared } = useFunction();
  return (
    <div
      className="col-12 px-0 bg-primary-light mb-3"
      onClick={(e) => {
        navigate(
          e,
          `classes/${classeSlug}/periodes/${periodeSlug}/matieres/${matiereSlug}/chapitres/${chapitreSlug}/lecons/${data.slug}`
        );
        updateDataShared("lecon", data);
      }}
    >
      <div className="d-flex">
        <div className="bg-primary rect-icon">
          <span className="text-white fw-bold text-uppercase">
            <BookSvg />
          </span>
        </div>
        <div className="w-100 text-primary position-relative">
          <div className="d-flex align-items-center px-2">
            <span className="fw-bold me-auto">{data.label}</span>
            <IonIcon icon={chevronForward} />
          </div>
          <div className="d-flex px-2 mt-2">
            <div className="border-start  text-center px-2 border-primary">
              <LessonSvg /> <br />
              <span>0 Cours</span>
            </div>
            <div className="border-start border-end text-center px-2 border-primary">
              <ExerciceSvg /> <br />
              <span>0 Exercice</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lecon;
