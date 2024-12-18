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
import {
  notifications,
  chevronDown,
  chevronForward,
  calendar,
} from "ionicons/icons";
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
import { Retour } from "../../components/Retour";

const Message = () => {
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
    messageSlug,
  }: any = useParams();
  const [loaded, setLoaded] = useState(false);
  const [matiere, setMatiere] = useState<any>("");
  const [chapitre, setChapitre] = useState<any>("");
  const [lecon, setLecon] = useState<any>("");

  useEffect(() => {
    get(endPoint.messagesDefilants + `/${messageSlug}`, setDatas, setLoaded);
  }, [user]);

  const [scrollCount, setScrollCount] = useState(0);
  const [totalScrollDistance, setTotalScrollDistance] = useState(0);

  const startTime = performance.now();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop; // Position actuelle du scroll
      setScrollCount((prevCount) => prevCount + 1); // Incrémenter le compteur de scrolls
      setTotalScrollDistance(scrollPosition); // Enregistrer la position
      console.log(`Position de scroll : ${scrollPosition}px`);
    };

    const sendMetrics = () => {
      const endTime = performance.now();
      const timeSpent = Math.round((endTime - startTime) / 1000);

      const hours = Math.floor(timeSpent / 3600);
      const minutes = Math.floor((timeSpent % 3600) / 60);
      const seconds = timeSpent % 60;
      const formattedTime = [
        String(hours).padStart(2, "0"),
        String(minutes).padStart(2, "0"),
        String(seconds).padStart(2, "0"),
      ].join(":");

      /*axios
        .post("/api/user-metrics", {
          time_spent: formattedTime,
          scroll_count: scrollCount,
          total_scroll_distance: totalScrollDistance,
          page: window.location.pathname,
        })
        .catch((err) => {
          console.error("Erreur lors de l'envoi des données :", err);
        });*/

      console.log(
        `Temps passé : ${formattedTime}, Scrolls : ${scrollCount}, Distance totale : ${totalScrollDistance}px`
      );

      const times = sumTimes([formattedTime, formattedTime]);
      localStorage.setItem(coursSlug, times);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("beforeunload", sendMetrics);

    return () => {
      sendMetrics();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", sendMetrics);
    };
  }, [scrollCount, totalScrollDistance]);

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

  function sumTimes(times: any) {
    let totalSeconds = 0;

    times.forEach((time: any) => {
      const [hours, minutes, seconds] = time.split(":").map(Number);
      totalSeconds += hours * 3600 + minutes * 60 + seconds;
    });

    const totalHours = Math.floor(totalSeconds / 3600);
    const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
    const totalSecs = totalSeconds % 60;

    // Formater le résultat en HH:MM:SS
    const formattedTime = [
      totalHours.toString().padStart(2, "0"),
      totalMinutes.toString().padStart(2, "0"),
      totalSecs.toString().padStart(2, "0"),
    ].join(":");

    return formattedTime;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <Container>
            <IonTitle>Actualités & Événements</IonTitle>
          </Container>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Container>
          <div className="container-fluid">
            <div className="row mt-2">
              {loaded && (
                <>
                  {/**
                   * <div
                    dangerouslySetInnerHTML={{ __html: datas?.description }}
                  />
                   */}
                  <Retour />
                  <div className="text-center mb-3 text-primary fs-1">
                    {datas.titre}
                  </div>
                  <div className="text-center mb-3 text-primary fs-5">
                    <span>
                      <IonIcon icon={calendar} className="fs-4" />{" "}
                    </span>{" "}
                    <br />
                    <span>
                      {new Date(datas.date_debut).toLocaleDateString() +
                        " - " +
                        new Date(datas.date_fin).toLocaleDateString()}
                    </span>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: datas?.contenu }} />
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

export default Message;
