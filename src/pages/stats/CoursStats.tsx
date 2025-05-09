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
import { endPoint, request } from "../../services";
import { Classe, Periode } from "./components";
import useRequestMatiere from "./hooks/useRequest";
import useFunction from "../../hooks/useFunction";
import { ContentHeader } from "../../components/ContentHeader";

const CoursStats = () => {
  const { user } = useAuth();
  const [section, setSection] = useState(0);
  const [datas, setDatas] = useState<any>([]);
  const [meets,setMeets] = useState<any>([]);
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
  const headers = {
    headers: {
      'Authorization' : `Bearer ${user?.token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  useEffect(() => {
    if (user) {
      getPeriodeClasse(setPeriodes, setClasses);
      get(endPoint.matieres, setDatas, setLoaded);
      getMeet()
    }
  }, [user]);

  const getMeet = () => {
    request.get("my-meets",headers).then((res) => {
      console.log(res.data)
      setMeets(res.data)
    }).catch((error)=>{
      console.log(error)
    })
  }

  const deconnection = (e: any) => {
    logout();
    navigate(e, "connexion");
  };

  return (
    <IonPage>
      <ContentHeader idPopover={"coursStats"} />

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
                <LinkList />
              </div>
              <div className="col-12 text-center mt-2 mb-3">
                <span className="bg-primary-light text-danger fw-bold px-3 py-2">
                  Classes virtuelles
                </span>
              </div>
              {loaded &&
                meets.map((data: any) => {
                  return <Item data={data} key={data.slug} />;
                })}
              {!loaded && <Skeleton />}
            </div>
          </div>
        </Container>

        <IonModal
          ref={modalClasse}
          initialBreakpoint={0.25}
          breakpoints={[0, 0.25, 0.5, 0.75]}
        >
          <IonContent>
            <Container>
              <div className="my-2 text-center">Sélectionnez une classe</div>
              {classes.map((data: any) => {
                return (
                  <Classe
                    key={data.slug}
                    data={data}
                    isActive={dataShared?.classe?.slug === data.slug}
                    modal={modalClasse}
                  />
                );
              })}
            </Container>
          </IonContent>
        </IonModal>
        <IonModal
          ref={modalPeriode}
          initialBreakpoint={0.25}
          breakpoints={[0, 0.25, 0.5, 0.75]}
        >
          <IonContent>
            <Container>
              <div className="my-2 text-center">Sélectionnez une periode</div>
              {periodes.map((data: any) => {
                return (
                  <Periode
                    key={data.slug}
                    data={data}
                    isActive={dataShared?.periode?.slug === data.slug}
                    modal={modalPeriode}
                  />
                );
              })}
            </Container>
          </IonContent>
        </IonModal>
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
      className="col-12 px-0 bg-primary-light mb-3"
      onClick={(e) => {
        localStorage.setItem('meet_link', JSON.stringify(data))
        navigate(
          e,
          //`classes/${dataShared?.classe?.slug}/periodes/${dataShared?.periode?.slug}/matieres/${data?.slug}/stats`
          'classes-virtuelles'
        );
        updateDataShared("matiere", data);
      }}
    >
      <div className="d-flex">
        <div className="bg-primary rect-icon">
          <span className="text-white fw-bold text-uppercase">
            {/*data.abreviation*/ "Meet"}
          </span>
        </div>
        <div className="w-100 text-primary position-relative">
          <div className="d-flex align-items-center px-2">
            <span className="fw-bold me-auto">{data?.meet?.title}</span>
            <IonIcon icon={chevronForward} />
          </div>
          <div className="d-flex px-2 mt-3">
            <div className="border-start border-end text-center px-2 border-primary">
              <LessonSvg /> <br />
              <span>{data?.meet?.duration}h de session</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursStats;
