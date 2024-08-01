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
import { Container } from "../../components";
import BookSvg from "../../components/svg/BookSvg";
import ClasseSvg from "../../components/svg/ClasseSvg";
import ExerciceSvg from "../../components/svg/ExerciceSvg";
import LessonSvg from "../../components/svg/LessonSvg";
import SuccessSvg from "../../components/svg/SuccessSvg";
import { useAuth, useDataProvider, useNavigate, useRequest } from "../../hooks";
import { endPoint } from "../../services";
import { useParams } from "react-router";

const Chapitre = () => {
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

  useEffect(() => {
    get(
      endPoint.chapitres + `/${matiereSlug}/${classeSlug}/${periodeSlug}`,
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
            <div className="row mt-2 text-14">
              <div className="col-6 px-0 pe-1">
                <div
                  className="d-flex align-items-center text-primary p-1 bg-primary-light"
                  onClick={(e) => {
                    e.preventDefault();
                    modalClasse.current?.present();
                  }}
                >
                  <div className="me-auto">
                    <ClasseSvg /> <span>{dataShared?.classe?.label}</span>
                  </div>
                  <IonIcon icon={chevronDown} />
                </div>
              </div>
              <div className="col-6 px-0 ps-1">
                <div
                  className="d-flex align-items-center text-primary p-1 bg-primary-light"
                  onClick={(e) => {
                    e.preventDefault();
                    modalPeriode.current?.present();
                  }}
                >
                  <div className="me-auto">
                    <ClasseSvg /> <span>{dataShared?.periode?.label}</span>
                  </div>
                  <IonIcon icon={chevronDown} />
                </div>
              </div>
              <div className="col-12 px-0 mt-2 ">
                <div className="d-flex align-items-center justify-content-center text-primary p-1 bg-gray">
                  <div className="">
                    <SuccessSvg />{" "}
                    <span className="text-lowcase">
                      Moyenne {dataShared.periode.label}:
                      <span className="text-danger ps-2 fw-bold">
                        En attente
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-2 text-14 py-2 text-center bg-gray">
                Messages défilantes : Actualités et évènements
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row mt-2">
              <div className="col-12 px-0">
                <div className="d-flex align-items-center text-12 ">
                  <span className="text-primary me-1">
                    {dataShared?.periode?.label}
                  </span>
                  <IonIcon icon={chevronForward} />
                  <span onClick={(e) => changeSection(e, section - 1)}>
                    {dataShared?.matiere?.label}
                  </span>
                  <IonIcon icon={chevronForward} />
                  <span>Chapitres</span>
                </div>
              </div>
              <div className="col-12 text-center mt-2 mb-3">
                Liste des matières
              </div>
              {loaded &&
                datas?.map((data: any) => {
                  return <ChapitreItem data={data} />;
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

interface ChapitreProps {
  data: any;
}
const ChapitreItem: React.FC<ChapitreProps> = ({ data }) => {
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
            <div className="border-start border-end text-center px-2 border-primary">
              <LessonSvg /> <br />
              <span>0 Leçons</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapitre;
