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
  IonPopover,
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
  ellipsisVertical,
} from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { Container, LinkList } from "../../components";
import BookSvg from "../../components/svg/BookSvg";
import ClasseSvg from "../../components/svg/ClasseSvg";
import ExerciceSvg from "../../components/svg/ExerciceSvg";
import LessonSvg from "../../components/svg/LessonSvg";
import SuccessSvg from "../../components/svg/SuccessSvg";
import { useAuth, useDataProvider, useNavigate, useRequest } from "../../hooks";
import { endPoint } from "../../services";
import useRequestMatiere from "./hooks/useRequest";
import useFunction from "../../hooks/useFunction";
import ClassePeriodeSelect from "../../components/ClassePeriodeSelect";
import { Retour } from "../../components/Retour";
import { ContentHeader } from "../../components/ContentHeader";

const StatsDetail = () => {
  const { user } = useAuth();
  const [section, setSection] = useState(0);
  const [datas, setDatas] = useState<any>([]);
  const [periodes, setPeriodes] = useState<any>([]);
  const [classes, setClasses] = useState<any>([]);
  const { get } = useRequest();
  const { getPeriodeClasse } = useRequestMatiere();
  const { navigate } = useNavigate();
  const modalPeriode = useRef<HTMLIonModalElement>(null);
  const modalClasse = useRef<HTMLIonModalElement>(null);
  const { dataShared }: any = useDataProvider();
  const [loaded, setLoaded] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    //getPeriodeClasse(setPeriodes, setClasses);
    get(endPoint.matieres, setDatas, setLoaded);
  }, [user, dataShared]);

  const deconnection = (e: any) => {
    logout();
    navigate(e, "connexion");
  };

  return (
    <IonPage>
      <ContentHeader idPopover={"statsDetail"} />

      <IonContent>
        <Container>
          <ClassePeriodeSelect onChange={() => {}} setLoaded={setLoaded} />
          <div className="container-fluid">
            <div className="row mt-2">
              <div className="col-12 px-0">
                <LinkList />
              </div>
              <div className="col-12 text-center mt-2 mb-3">
                <span className="bg-primary-light text-danger fw-bold px-3 py-2">
                  Statistiques
                </span>
              </div>
              <Retour />
              {loaded && (
                <>
                  <div className="mt-3"></div>
                  <Item
                    data={{
                      label: "Cours",
                      valueName: "Terminé",
                    }}
                  />
                  <Item
                    data={{
                      label: "Exercice",
                      valueName: "Terminé",
                    }}
                  />
                  <Item
                    data={{
                      label: "Devoir",
                      valueName: "Effectué",
                    }}
                  />
                  <Item
                    data={{
                      label: "Moyenne",
                      valueName: "Moyenne",
                    }}
                  />
                </>
              )}
              {!loaded && <Skeleton />}
            </div>
          </div>
        </Container>

        <IonPopover trigger="popover-button" dismissOnSelect={true}>
          <IonContent>
            <IonList>
              <IonItem button={true} detail={false}>
                A propos
              </IonItem>
              <IonItem button={true} detail={false} onClick={deconnection}>
                Se deconnecter
              </IonItem>
            </IonList>
          </IonContent>
        </IonPopover>
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
  const { dataShared }: any = useDataProvider();
  const { updateDataShared } = useFunction();

  return (
    <div
      className="col-6 px-0 mb-3 px-2"
      onClick={(e) => {
        /*navigate(
          e,
          `classes/${dataShared?.classe?.slug}/periodes/${dataShared?.periode?.slug}/matieres/${data?.slug}/chapitres`
        );*/
      }}
    >
      <div className="d-flex bg-primary-light">
        <div className="w-100 text-primary position-relative">
          <div className="d-flex align-items-center px-2">
            <span className="fw-bold me-auto">{data.label}</span>
            {/**<IonIcon icon={chevronForward} /> */}
          </div>
          <div className="d-flex px-2 mt-3">
            <div className="border-start border-end text-center px-2 border-primary">
              {data.label === "Cours" ? <LessonSvg /> : <ExerciceSvg />}
              <br />
              <span>{data.valueName} : 0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDetail;
