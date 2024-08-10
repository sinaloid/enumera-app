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
import "./Evaluation.css";
const Evaluation = () => {
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
    coursSlug,
    evaluationSlug,
  }: any = useParams();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    get(
      endPoint.evaluations_lecons + `/${evaluationSlug}`,
      setDatas,
      setLoaded
    );
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
            <div>
              {loaded && (
                <>
                  <div className="fw-bold text-center fs-5">{datas?.label}</div>
                </>
              )}
              {!loaded && <Skeleton />}
            </div>
            <div className="row mt-2">
              <div className="d-flex align-items-center w-100">
                <div className="me-auto">
                  <div className="w-100 text-primary fw-bold">Questions</div>
                  <div className="text-center fw-bold">1/20</div>
                </div>
                <div className="evalu-circle d-flex align-items-center justify-content-center">
                  <span>1 pts</span>
                </div>
              </div>
              <div className="progress-bar my-4 rounded-5 px-0">
                <div className="w-50 progress-bar bg-primary text-center text-white fw-bold">
                  50%
                </div>
              </div>
            </div>
            <div className="row bg-gray question rounded-3">
              <div className="col-12 p-2 fw-bold">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Repudiandae adipisci voluptate ratione excepturi expedita
                perspiciatis, pariatur doloribus aut totam at voluptates
                molestiae soluta, doloremque officia. Fugit consequatur voluptas
                dolorem tempore.
              </div>
            </div>
          </div>
          <div className="container-fluid mt-4">
            <div className="row mt-2">{!loaded && <Skeleton />}</div>
            <div className="row">
              {[...Array(4).keys()].map((data, idx) => {
                return (
                  <div className="d-flex bg-gray mb-3 d-flex px-0" key={idx}>
                    <div className="d-flex align-items-center justify-content-center text-white bg-primary rec-num-size">
                      {idx + 1}
                    </div>
                    <div className="p-2">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="d-flex justify-content-center">
              <IonButton className="w-75" shape="round">
                Valider
              </IonButton>
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

export default Evaluation;
