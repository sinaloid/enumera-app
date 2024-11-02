import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSkeletonText,
  IonTextarea,
  IonThumbnail,
} from "@ionic/react";
import {
  radioButtonOnOutline,
  radioButtonOffOutline,
  squareOutline,
  checkboxOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Container } from "../../components";
import { useAuth } from "../../hooks";
import { endPoint } from "../../services";
import { useHistory, useParams } from "react-router";
import "./Evaluation.css";
import useRequestEvaluation from "./hooks/useRequest";
import { Retour } from "../../components/Retour";
import { ContentHeader } from "../../components/ContentHeader";

const EvaluationLecon = () => {
  const { user } = useAuth();
  const [datas, setDatas] = useState<any>([]);
  const { getEvaluation, sendUserReponse } = useRequestEvaluation();
  const { evaluationSlug }: any = useParams();
  const [loaded, setLoaded] = useState(false);
  const [questions, setQuestions]: any = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentChoix, setCurrentChoix]: any = useState([]);
  const [point, setPoint] = useState(0);
  const [pointCurrent, setPointCurrent] = useState(0);
  const history = useHistory();

  useEffect(() => {
    getEvaluation(
      endPoint.evaluations_lecons + `/${evaluationSlug}`,
      setDatas,
      setQuestions,
      setLoaded
    );
    sessionStorage.removeItem("user_response");
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

  const sendReponse = (e: any) => {
    e.preventDefault();
    if (questions.type.includes("REPONSE_SAISIE")) {
      verifyReponseSaisie();
    } else {
      verifyReponseChoix();
    }

    if (questionIndex + 1 < datas.question_lecons.length) {
      setQuestions(datas.question_lecons[questionIndex + 1]);
    }

    console.log("Point current : " + pointCurrent);

    saveUserResponse();
    setQuestionIndex(questionIndex + 1);
    setCurrentChoix([]);

    // Instruction de verification de la dernier question
    if (questionIndex + 1 == datas.question_lecons?.length) {
      //history.replaceState
      let old_user_reponse: any = sessionStorage.getItem("user_response");
      sessionStorage.setItem("user_point", "0");

      old_user_reponse &&
        sendUserReponse(
          endPoint.res_lecons_eleves,
          {
            evaluation: evaluationSlug,
            user_response: JSON.parse(old_user_reponse),
            point_obtenu: point,
          },
          goToResult
        );
      //goToResult({});
    }
    setPointCurrent(0);
  };

  const goToResult = (e: any) => {
    localStorage.setItem(
      "point",
      "" + point + "/" + datas.question_lecons.length
    );
    //navigate(e, "resultat", "replace");
    history.replace("/resultat");
  };

  const verifyReponseChoix = () => {
    //console.log("Choix multiple");
    //console.log(currentChoix?.join(";"));

    if (currentChoix.length !== 0) {
      const reponseQuestion = questions.reponses.split(";").map(Number);
      const inclus = currentChoix.every((value: any) =>
        reponseQuestion.includes(value)
      );
      if (inclus) {
        const pointActuel = point + parseInt(questions.point);
        setPoint(pointActuel);
        sessionStorage.setItem("user_point", questions.point);
      }
    }
  };

  const verifyReponseSaisie = () => {
    console.log("Reponse saisie");
    console.log(currentChoix);
    if (
      currentChoix.length !== 0 &&
      questions.reponses.includes(currentChoix)
    ) {
      const pointActuel = point + parseInt(questions.point);
      setPoint(pointActuel);
      sessionStorage.setItem("user_point", questions.point);
    }
  };

  const saveUserResponse = () => {
    let old_user_reponse: any = sessionStorage.getItem("user_response");
    let user_point = sessionStorage.getItem("user_point");
    sessionStorage.setItem("user_point", "0");

    old_user_reponse = old_user_reponse ? JSON.parse(old_user_reponse) : [];
    console.log("Save user response : " + currentChoix.join(";"));
    sessionStorage.setItem(
      "user_response",
      JSON.stringify([
        ...old_user_reponse,
        {
          ...questions,
          user_reponse:
            currentChoix.length !== 0 ? currentChoix : ["Pas de réponse"],
          user_point: user_point,
        },
      ])
    );
  };

  return (
    <IonPage>
      <ContentHeader idPopover={"evaluation"} />

      <IonContent>
        <Retour className={"mx-2 mt-2 mb-0"} />

        <Container>
          <div className="container">
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
                  <Question questions={questions} />

                  <div className="container-fluid mt-4">
                    {questions.type === "CHOIX_SIMPLE" && (
                      <ChoixSimple
                        questions={questions}
                        choix={{ currentChoix, setCurrentChoix }}
                      />
                    )}
                    {questions.type === "CHOIX_MULTIPLE" && (
                      <ChoixMultiple
                        questions={questions}
                        choix={{ currentChoix, setCurrentChoix }}
                      />
                    )}
                    {questions.type === "REPONSE_SAISIE" && (
                      <ReponseSaisie
                        questions={questions}
                        choix={{ currentChoix, setCurrentChoix }}
                      />
                    )}

                    {questions.type === "CHOIX_SIMPLE_IMAGE" && (
                      <ChoixSimpleImage
                        questions={questions}
                        choix={{ currentChoix, setCurrentChoix }}
                      />
                    )}

                    {questions.type === "CHOIX_MULTIPLE_IMAGE" && (
                      <ChoixMultipleImage
                        questions={questions}
                        choix={{ currentChoix, setCurrentChoix }}
                      />
                    )}

                    <div className="d-flex justify-content-center mt-3">
                      {questionIndex + 1 <= datas.question_lecons?.length && (
                        <IonButton
                          className="w-75"
                          shape="round"
                          onClick={sendReponse}
                          disabled={currentChoix.length === 0}
                        >
                          Valider
                        </IonButton>
                      )}
                      {questionIndex + 1 > datas.question_lecons?.length && (
                        <IonButton
                          className="w-75"
                          shape="round"
                          onClick={goToResult}
                        >
                          Terminer
                        </IonButton>
                      )}
                    </div>
                    <div className="text-center fw-bold text-danger mt-3">
                      <div
                        className="d-inline-block border px-2 rounded-5 border-danger"
                        onClick={sendReponse}
                        role="presentation"
                      >
                        Sauter la question
                      </div>
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

interface DataQuestion {
  questions: any;
  choix?: any;
}

const Question: React.FC<DataQuestion> = ({ questions, choix }) => {
  return (
    <div className="row bg-gray question rounded-3 mb-3">
      <div className="col-12 p-2 fw-bold">{questions?.question}</div>
    </div>
  );
};
const ChoixSimple: React.FC<DataQuestion> = ({ questions, choix }) => {
  const { currentChoix, setCurrentChoix } = choix;

  return (
    <div className="row">
      {questions?.choix?.map((data: any, idx: any) => {
        return (
          <div key={idx + "choixsimple"}>
            <div
              className={`d-flex bg-gray mb-3 d-flex px-0 border ${
                currentChoix.includes(idx + 1) && " border-primary"
              }`}
              role="presentation"
              onClick={(e) => {
                e.preventDefault();
                setCurrentChoix([idx + 1]);
              }}
            >
              <div className="d-flex align-items-center justify-content-center text-white bg-primary rec-num-size">
                {idx + 1}
              </div>
              <div className="p-2 ">{data}</div>
              <div className="ms-auto text-primary d-flex align-items-center px-1">
                {currentChoix.includes(idx + 1) ? (
                  <IonIcon icon={radioButtonOnOutline} />
                ) : (
                  <IonIcon icon={radioButtonOffOutline} />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ChoixMultiple: React.FC<DataQuestion> = ({ questions, choix }) => {
  const { currentChoix, setCurrentChoix } = choix;

  return (
    <div className="row">
      {questions?.choix?.map((data: any, idx: any) => {
        return (
          <div
            className={`d-flex bg-gray mb-3 d-flex px-0 border ${
              currentChoix.includes(idx + 1) && " border-primary"
            }`}
            key={idx}
            role="presentation"
            onClick={(e) => {
              e.preventDefault();
              if (currentChoix.includes(idx + 1)) {
                const tab = currentChoix.filter(
                  (data: any) => data !== idx + 1
                );
                setCurrentChoix(tab);
              } else {
                setCurrentChoix([...currentChoix, idx + 1]);
              }
            }}
          >
            <div className="d-flex align-items-center justify-content-center text-white bg-primary rec-num-size">
              {idx + 1}
            </div>
            <div className="p-2 ">{data}</div>
            <div className="ms-auto text-primary d-flex align-items-center px-1">
              {currentChoix.includes(idx + 1) ? (
                <IonIcon icon={checkboxOutline} />
              ) : (
                <IonIcon icon={squareOutline} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ReponseSaisie: React.FC<DataQuestion> = ({ questions, choix }) => {
  const { currentChoix, setCurrentChoix } = choix;

  return (
    <div className="row">
      <div className="mb-3 px-0">
        <IonTextarea
          label="Entrez votre réponse"
          labelPlacement="floating"
          counter={true}
          fill="outline"
          //maxlength={20}
          autoGrow={true}
          onIonChange={(e) => {
            setCurrentChoix([e.detail.value]);
          }}
          rows={6}
          //counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}
        ></IonTextarea>
      </div>
    </div>
  );
};

const ChoixSimpleImage: React.FC<DataQuestion> = ({ questions, choix }) => {
  const { currentChoix, setCurrentChoix } = choix;

  return (
    <div className="row">
      <div className="row row-cols-2 row-cols-md-4 g-1">
        {[...Array(8)].map((data: any, idx: any) => {
          return (
            <div className="col" key={"csi" + idx}>
              <div
                className={`d-flex bg-gray mb-3 d-flex px-0 border ${
                  currentChoix.includes(idx + 1) && " border-primary"
                }`}
                key={idx + "choixsimpleimage"}
                role="presentation"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentChoix([idx + 1]);
                }}
              >
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center pt-1 px-2 ms-auto text-primary">
                    {currentChoix.includes(idx + 1) ? (
                      <IonIcon icon={radioButtonOnOutline} />
                    ) : (
                      <IonIcon icon={radioButtonOffOutline} />
                    )}
                  </div>
                </div>
                <div className="p-2 ">
                  <img
                    width={"100%"}
                    src={"https://picsum.photos/200?random=" + idx}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ChoixMultipleImage: React.FC<DataQuestion> = ({ questions, choix }) => {
  const { currentChoix, setCurrentChoix } = choix;

  return (
    <div className="row">
      <div className="row row-cols-2 row-cols-md-4 g-1">
        {[...Array(8)].map((data: any, idx: any) => {
          return (
            <div className="col" key={"cmi" + idx}>
              <div
                className={`bg-gray mb- px-0 border ${
                  currentChoix.includes(idx + 1) && " border-primary"
                }`}
                key={idx + "ChoixMultipleImage"}
                role="presentation"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentChoix.includes(idx + 1)) {
                    const tab = currentChoix?.filter(
                      (data: any) => data !== idx + 1
                    );
                    setCurrentChoix(tab);
                  } else {
                    setCurrentChoix([...currentChoix, idx + 1]);
                  }
                }}
              >
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center pt-1 px-2 ms-auto text-primary">
                    {currentChoix.includes(idx + 1) ? (
                      <IonIcon icon={checkboxOutline} />
                    ) : (
                      <IonIcon icon={squareOutline} />
                    )}
                  </div>
                </div>
                <div className="p-2 ">
                  <img
                    width={"100%"}
                    src={"https://picsum.photos/200?random=" + idx}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
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
