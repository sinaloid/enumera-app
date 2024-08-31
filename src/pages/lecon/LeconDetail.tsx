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
import useRequestLecon from "./hooks/useRequest";
import useFunction from "../../hooks/useFunction";
import { Retour } from "../../components/Retour";
import { ContentHeader } from "../../components/ContentHeader";

const Cours = () => {
  const { user } = useAuth();
  const [section, setSection] = useState(0);
  const [datas, setDatas] = useState<any>([]);
  const { getLecon, get } = useRequestLecon();
  const { navigate } = useNavigate();
  const modalPeriode = useRef<HTMLIonModalElement>(null);
  const modalClasse = useRef<HTMLIonModalElement>(null);
  const { dataShared }: any = useDataProvider();
  const { classeSlug, matiereSlug, chapitreSlug, periodeSlug, leconSlug }: any =
    useParams();
  const [loaded, setLoaded] = useState(false);
  const [matiere, setMatiere] = useState<any>("");
  const [chapitre, setChapitre] = useState<any>("");

  useEffect(() => {
    getLecon(endPoint.lecons + `/${leconSlug}`, setDatas, setLoaded);
    get(endPoint.chapitres + `/${chapitreSlug}`, setChapitre, setLoaded);
    get(endPoint.matieres + `/${matiereSlug}`, setMatiere, setLoaded);
  }, [user]);
  
  return (
    <IonPage>
      <ContentHeader idPopover={"leconDetail"} />
      <IonContent>
        <Container>
          <div className="container-fluid">
            <div className="row mt-2 text-14">
              <div className="text-center fs-5">
                <div className="icon-circle bg-primary mx-auto d-flex align-items-center justify-content-center text-white">
                {dataShared?.classe?.label}<br />
                {" "+matiere?.abreviation}
                </div>
                <div className="my-2 text-14 fw-bold">{chapitre?.label}</div>
                <div className="my-2 fw-bold">{datas?.lecon?.label.split(":")[1]}</div>
              </div>
              
            </div>
          </div>
          <div className="container-fluid">
            <div className="row mt-2">
            <div className="col-12 px-0">
                <LinkList />
              </div>
              <div className="col-12 text-center mt-2 mb-3">
                <span className="bg-primary-light text-danger fw-bold px-3 py-2">
                Cours et exercices
                </span>
              </div>
              
              <Retour />
              {loaded && (
                <>
                  {datas?.cours?.map((data: any) => {
                    return <Item data={data} key={data.slug} />;
                  })}
                  {datas?.evaluations?.map((data: any) => {
                    return <ItemEvaluation data={data} key={data.slug} />;
                  })}
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
          <div className="row px-0" key={idx+data}>
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
  const { classeSlug, matiereSlug, periodeSlug, chapitreSlug, leconSlug }: any =
    useParams();
  const { updateDataShared } = useFunction();
  return (
    <div
      className="col-12 px-0 bg-primary-light mb-3"
      onClick={(e) => {
        navigate(
          e,
          `classes/${classeSlug}/periodes/${periodeSlug}/matieres/${matiereSlug}/chapitres/${chapitreSlug}/lecons/${leconSlug}/cours/${data.slug}`
        );
        updateDataShared("cours", data);
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
            <span className="fw-bold me-auto">
               {data?.label?.split(":")[1]}
            </span>
            <IonIcon icon={chevronForward} />
          </div>
          <div className="d-flex px-2 mt-2">
            <div className="border-start border-end text-center px-2 border-primary">
              <LessonSvg /> <br />
              <span>0 Cours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ItemEvaluation: React.FC<ItemProps> = ({ data }) => {
  const { navigate } = useNavigate();
  const { classeSlug, matiereSlug, periodeSlug, chapitreSlug, leconSlug }: any =
    useParams();
  const { updateDataShared } = useFunction();
  return (
    <div
      className="col-12 px-0 bg-secondary-light bg-warning mb-3"
      onClick={(e) => {
        navigate(
          e,
          `classes/${classeSlug}/periodes/${periodeSlug}/matieres/${matiereSlug}/chapitres/${chapitreSlug}/lecons/${leconSlug}/evaluation/${data.slug}`
        );
        updateDataShared("cours", data);
      }}
    >
      <div className="d-flex">
        <div className="bg-secondary rect-icon">
          <span className="text-white fw-bold text-uppercase">
            <ExerciceSvg />
          </span>
        </div>
        <div className="w-100 text-primary position-relative">
          <div className="d-flex align-items-center px-2">
            <span className="fw-bold me-auto">
              {data?.label}
            </span>
            <IonIcon icon={chevronForward} />
          </div>
          <div className="d-flex px-2 mt-2">
            <div className="border-start border-end text-center px-2 border-primary">
              <ExerciceSvg /> <br />
              <span>{data.question_lecons?.length} questions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cours;
