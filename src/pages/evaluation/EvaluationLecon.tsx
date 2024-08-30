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
  radioButtonOnOutline,
  radioButtonOffOutline,
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
import { useAuth, useDataProvider, useNavigate } from "../../hooks";
import { endPoint } from "../../services";
import { useParams } from "react-router";
import "./Evaluation.css";
import useRequestEvaluation from "./hooks/useRequest";
const EvaluationLecon = () => {
  const { user } = useAuth();
  const [section, setSection] = useState(0);
  const [datas, setDatas] = useState<any>([]);
  const [periodes, setPeriodes] = useState<any>([]);
  const [classes, setClasses] = useState<any>([]);
  const { getEvaluation } = useRequestEvaluation();
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
  const [questions, setQuestions]: any = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentChoix, setCurrentChoix] = useState("");
  const [point, setPoint] = useState(0);

  useEffect(() => {
    getEvaluation(
      endPoint.evaluations_lecons + `/${evaluationSlug}`,
      setDatas,
      setQuestions,
      setLoaded
    );
  }, [user]);

  useEffect(() => {
    //mediaConfig();
    const tab = datas.question_lecons?.map((data: any) => {
      //data.reponses_list =  data.choix.split(";")
      return data;
    });
    console.log(tab);
    //setQuestions(tab)
  }, [datas]);

  const addChoix = (e: any, idx: any) => {
    e.preventDefault();
  };

  const sendReponse = (e: any) => {
    e.preventDefault();

    console.log(questions.reponses.includes(currentChoix));
    if (questions.reponses.includes(currentChoix)) {
      const pointActuel = point + parseInt(questions.point);
      setPoint(pointActuel);
    }
    if (questionIndex + 1 < datas.question_lecons.length) {
      setQuestions(datas.question_lecons[questionIndex + 1]);
    }
    setQuestionIndex(questionIndex + 1);
    setCurrentChoix("");
  };

  const goToResult = (e: any) => {
    localStorage.setItem(
      "point",
      "" + point + "/" + datas.question_lecons.length
    );
    navigate(e, "resultat", "replace");
  };

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
                  <div className="row mt-2">
                    <div className="d-flex align-items-center w-100">
                      <div className="me-auto">
                        <div className="w-100 text-primary fw-bold">
                          Questions
                        </div>
                        <div className="text-center fw-bold">
                          {questionIndex}/{datas?.question_lecons?.length}
                        </div>
                      </div>
                      <div className="evalu-circle d-flex align-items-center justify-content-center">
                        <span>{point} pts</span>
                      </div>
                    </div>
                    <div className="progress-bar my-4 rounded-5 px-0">
                      <div
                        className=" progress-bar bg-primary text-center text-white fw-bold"
                        style={{
                          width: `${
                            (questionIndex * 100) /
                            datas?.question_lecons?.length
                          }%`,
                        }}
                      >
                        {parseInt(
                          "" +
                            (questionIndex * 100) /
                              datas?.question_lecons?.length
                        )}
                        %
                      </div>
                    </div>
                  </div>
                  <div className="row bg-gray question rounded-3">
                    <div className="col-12 p-2 fw-bold">
                      {questions?.question}
                    </div>
                  </div>
                  <div className="container-fluid mt-4">
                    <div className="row">
                      {questions?.choix?.map((data: any, idx: any) => {
                        return (
                          <div
                            className={`d-flex bg-gray mb-3 d-flex px-0 border ${
                              currentChoix === "" + (idx + 1) &&
                              " border-primary"
                            }`}
                            key={idx}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentChoix("" + (idx + 1));
                            }}
                          >
                            <div className="d-flex align-items-center justify-content-center text-white bg-primary rec-num-size">
                              {idx + 1}
                            </div>
                            <div className="p-2 ">{data}</div>
                            <div className="ms-auto text-primary d-flex align-items-center px-1">
                              {currentChoix === "" + (idx + 1) ? (
                                <IonIcon icon={radioButtonOnOutline} />
                              ) : (
                                <IonIcon icon={radioButtonOffOutline} />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="d-flex justify-content-center">
                      {questionIndex + 1 <= datas.question_lecons?.length && (
                        <>
                          <IonButton
                            className="w-75"
                            shape="round"
                            onClick={sendReponse}
                          >
                            Valider
                          </IonButton>
                        </>
                      )}
                      {questionIndex + 1 > datas.question_lecons?.length && (
                        <>
                          <IonButton
                            className="w-75"
                            shape="round"
                            onClick={goToResult}
                          >
                            Terminer
                          </IonButton>
                        </>
                      )}
                    </div>
                  </div>
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
          <div className="row px-0" key={idx + data}>
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

export default EvaluationLecon;
