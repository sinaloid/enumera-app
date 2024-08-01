import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { notifications, chevronDown, chevronForward } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Container } from "../../components";
import BookSvg from "../../components/svg/BookSvg";
import ClasseSvg from "../../components/svg/ClasseSvg";
import ExerciceSvg from "../../components/svg/ExerciceSvg";
import LessonSvg from "../../components/svg/LessonSvg";
import SuccessSvg from "../../components/svg/SuccessSvg";
import { useAuth, useNavigate, useRequest } from "../../hooks";
import { endPoint } from "../../services";

const Matiere = () => {
  const { user } = useAuth();
  const [section, setSection] = useState(0);
  const [datas, setDatas] = useState<any>([]);
  const { get } = useRequest();
  const {navigate} = useNavigate()

  useEffect(() => {
    get(endPoint.matieres, setDatas);
  }, [user]);
  const matieres = [
    {
      intitule: "FR",
      nom: "Français",
    },
    {
      intitule: "Math",
      nom: "Mathématiques",
    },
    {
      intitule: "PC",
      nom: "Physique chime",
    },
    {
      intitule: "ALL",
      nom: "Allemand",
    },
    {
      intitule: "EPS",
      nom: "Education physique et sportive",
    },
    {
      intitule: "Biblio",
      nom: "Bibliothèque",
    },
  ];
  const chapitres = [
    {
      intitule: <BookSvg />,
      nom: "Chapitre 1 : L'histoire du Burkina",
    },
    {
      intitule: <BookSvg />,
      nom: "Chapitre 1 : L'histoire du Burkina",
    },
    {
      intitule: <BookSvg />,
      nom: "Chapitre 1 : L'histoire du Burkina",
    },
    {
      intitule: <BookSvg />,
      nom: "Chapitre 1 : L'histoire du Burkina",
    },
    {
      intitule: <BookSvg />,
      nom: "Chapitre 1 : L'histoire du Burkina",
    },
    {
      intitule: <BookSvg />,
      nom: "Chapitre 1 : L'histoire du Burkina",
    },
  ];
  const list: any = {
    0: matieres,
    1: chapitres,
  };
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
          <div className="container-fluid bg-gray">
            <div className="row mt-2 text-14">
              <div className="col-6 px-0 pe-1">
                <div className="d-flex align-items-center text-primary p-1 bg-white">
                  <div className="me-auto">
                    <ClasseSvg /> <span>1er Trimestre</span>
                  </div>
                  <IonIcon icon={chevronDown} />
                </div>
              </div>
              <div className="col-6 px-0 ps-1">
                <div className="d-flex align-items-center text-primary p-1 bg-white">
                  <div className="me-auto">
                    <SuccessSvg /> <span>Moyenne Tri.:12,75</span>
                  </div>
                  <IonIcon icon={chevronDown} />
                </div>
              </div>
              <div className="col-12 mt-2 text-14 py-2 text-center bg-primary-light">
                Messages défilantes : Actualités et évènements
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row mt-2">
              <div className="col-12 px-0">
                <div className="d-flex align-items-center text-12 ">
                  <span className="text-primary me-1">Trimestre 1</span>
                  <IonIcon icon={chevronForward} />
                  <span onClick={(e) => changeSection(e, section - 1)}>
                    Matières
                  </span>
                  {section === 1 && (
                    <>
                      <IonIcon icon={chevronForward} />
                      <span>Chapitres</span>
                    </>
                  )}
                </div>
              </div>
              <div className="col-12 text-center mt-2 mb-3">
                Liste des matières
                
              </div>
              {
                datas?.map((data: any, idx: number) => {
                  return (
                    <div
                      className="col-12 px-0 bg-primary-light mb-3"
                      key={idx}
                      onClick={(e) => navigate(e,"periodes/"+data.slug+"/matieres")}
                    >
                      <div className="d-flex">
                        <div className="bg-primary rect-icon">
                          <span className="text-white fw-bold">
                            {data.abreviation}
                          </span>
                        </div>
                        <div className="w-100 text-primary position-relative">
                          <div className="d-flex align-items-center px-2">
                            <span className="fw-bold me-auto">{data.label}</span>
                            <IonIcon icon={chevronForward} />
                          </div>
                          <div className="d-flex px-2 position-absolute bottom-0">
                            <div className="border-start border-end text-center px-2 border-primary">
                              <LessonSvg /> <br />
                              <span> Chapitres</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Matiere;