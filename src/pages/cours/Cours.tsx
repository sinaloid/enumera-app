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
import ZoomableIframe from "./ZoomableIframe";
import { ContentHeader } from "../../components/ContentHeader";
import TimerWithVisibility from "../../components/TimerWithVisibility";

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
  const {
    classeSlug,
    matiereSlug,
    periodeSlug,
    chapitreSlug,
    leconSlug,
    coursSlug,
  }: any = useParams();
  const [loaded, setLoaded] = useState(false);
  const [matiere, setMatiere] = useState<any>("");
  const [chapitre, setChapitre] = useState<any>("");
  const [lecon, setLecon] = useState<any>("");

  useEffect(() => {
    get(endPoint.cours + `/${coursSlug}`, setDatas, setLoaded);
    get(endPoint.matieres + `/${matiereSlug}`, setMatiere, setLoaded);
    get(endPoint.chapitres + `/${chapitreSlug}`, setChapitre, setLoaded);
    get(endPoint.lecons + `/${leconSlug}`, setLecon, setLoaded);
  }, [user]);

  useEffect(() => {
    mediaConfig();
  }, [datas]);

  const mediaConfig = () => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.controls = true;
      video.setAttribute("class", "w-100");
    });

    const audios = document.querySelectorAll("audio");
    audios.forEach((audio) => {
      audio.controls = true;
      audio.setAttribute("class", "w-100");
    });

    const images = document.querySelectorAll("image");
    images.forEach((image) => {
      image.setAttribute("class", "w-100");
    });

    console.log(videos);
  };
  return (
    <IonPage>
      <ContentHeader idPopover={"cours"} />
      <IonContent>
        <Container>
          <div className="container-fluid">
            <div className="row mt-2 text-14 border-bottom">
              <div className="text-center fs-5">
                <div className="icon-circle bg-primary mx-auto d-flex align-items-center justify-content-center text-white">
                  {dataShared?.classe?.label}
                  <br />
                  {" " + matiere?.abreviation}
                </div>
                <div className="my-2 text-12 fw-bold">{chapitre?.label}</div>
                <div className="my-2 fw-bold text-14">{lecon?.label}</div>
              </div>
              <div className="d-flex justify-content-center text-primary">
                <TimerWithVisibility />
              </div>
              {/**
               * <div className="col-12 mt-2 text-14 py-2 text-center bg-gray">
                Messages défilantes : Actualités et évènements
              </div>
               */}
            </div>
          </div>
          <div className="container-fluid">
            <div className="row mt-2">
              <div className="col-12 px-0">
                <LinkList />
              </div>

              {loaded && (
                <>
                  {/**
                   * <div
                    dangerouslySetInnerHTML={{ __html: datas?.description }}
                  />
                   */}

                  <ZoomableIframe
                    description={datas?.description}
                  ></ZoomableIframe>
                </>
              )}
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

interface LeconProps {
  data: any;
}
const ChapitreItem: React.FC<LeconProps> = ({ data }) => {
  const { navigate } = useNavigate();
  const { dataShared }: any = useDataProvider();

  return (
    <div
      className="col-12 px-0 bg-primary-light mb-3"
      onClick={(e) =>
        navigate(
          e,
          `classes/${dataShared?.classe?.slug}/periodes/${dataShared?.periode?.slug}/matieres/${data?.slug}/chapitres`
        )
      }
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
          <div className="d-flex px-2 position-absolute bottom-0">
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
