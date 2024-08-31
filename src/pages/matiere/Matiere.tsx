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
import ClasseSvg from "../../components/svg/ClasseSvg";
import LessonSvg from "../../components/svg/LessonSvg";
import SuccessSvg from "../../components/svg/SuccessSvg";
import { useAuth, useDataProvider, useNavigate, useRequest } from "../../hooks";
import { endPoint } from "../../services";
import { Classe, Periode } from "./components";
import useRequestMatiere from "./hooks/useRequest";
import useFunction from "../../hooks/useFunction";
import ClassePeriodeSelect from "../../components/ClassePeriodeSelect";
import { Option } from "../../components/Option";
import { ContentHeader } from "../../components/ContentHeader";

const Matiere = () => {
  const { user } = useAuth();
  const [datas, setDatas] = useState<any>([]);
  const { get } = useRequest();
  const { getPeriodeClasse } = useRequestMatiere();
  const { navigate } = useNavigate();
  const modalPeriode = useRef<HTMLIonModalElement>(null);
  const modalClasse = useRef<HTMLIonModalElement>(null);
  const { dataShared }: any = useDataProvider();
  const [loaded, setLoaded] = useState(false);
  const { logout } = useAuth();
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    const classe = localStorage.getItem("classe");
    const periode = localStorage.getItem("periode");
    if (user) {
      get(
        endPoint.matieres + "/classe/" + classe + "/periode/" + periode,
        setDatas,
        setLoaded
      );
    }
  }, [user]);

  

  const callbackMatiere = (classe: string, periode: string) => {
    get(
      endPoint.matieres + "/classe/" + classe + "/periode/" + periode,
      setDatas,
      setLoaded
    );
  };
  return (
    <IonPage>
      <ContentHeader idPopover={"matiere"} />
      <IonContent>
        <Container>
          <div className="container-fluid">
            <div className="row mt-2">
              <ClassePeriodeSelect
                onChange={callbackMatiere}
                setLoaded={setLoaded}
              />
              <div className="col-12 px-0">
                <LinkList />
              </div>
              <div className="col-12 text-center mt-2 mb-3">
                <span className="bg-primary-light text-danger fw-bold px-3 py-2">
                  Liste des matières
                </span>
              </div>
              {loaded &&
                datas?.map((data: any) => {
                  return <Item data={data} key={data.slug} />;
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
  const { dataShared }: any = useDataProvider();
  const { updateDataShared } = useFunction();

  return (
    <div
      className="col-12 px-0 bg-primary-light mb-3"
      onClick={(e) => {
        navigate(
          e,
          `classes/${dataShared?.classe?.slug}/periodes/${dataShared?.periode?.slug}/matieres/${data.matiere?.slug}/chapitres`
        );
        updateDataShared("matiere", data.matiere);
      }}
    >
      <div className="d-flex">
        <div className="bg-primary rect-icon">
          <span className="text-white fw-bold text-uppercase">
            {data.matiere?.abreviation}
          </span>
        </div>
        <div className="w-100 text-primary position-relative">
          <div className="d-flex align-items-center px-2">
            <span className="fw-bold me-auto">{data.matiere?.label}</span>
            <IonIcon icon={chevronForward} />
          </div>
          <div className="d-flex px-2 mt-3">
            <div className="border-start border-end text-center px-2 border-primary">
              <LessonSvg /> <br />
              <span>{data.chapitres?.length} Chapitres</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matiere;
