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

const Matiere = () => {
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
  const [isFirstTime, setIsFirstTime] = useState(true)
  

  useEffect(() => {
    getPeriodeClasse(setPeriodes, setClasses, isFirstTime, setIsFirstTime);
    const classe = localStorage.getItem('classe')
    const periode = localStorage.getItem('periode')
    get(endPoint.matieres+"/classe/"+classe+"/periode/"+periode, setDatas, setLoaded);
  }, [user]);

  const deconnection = (e:any) => {
    logout();
    navigate(e, "connexion");
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
              <IonButton id="popover-button" className="back-circle">
                <IonIcon
                  color="medium"
                  className="text-24"
                  icon={ellipsisVertical}
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
                <LinkList />
              </div>
              <div className="col-12 text-center mt-2 mb-3">
                Liste des matières
              </div>
              {loaded &&
                datas?.map((data: any) => {
                  return <Item data={data} key={data.slug} />;
                })}
              {!loaded && <Skeleton />}
            </div>
          </div>
        </Container>

        <IonModal
          ref={modalClasse}
          initialBreakpoint={0.75}
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
                    setDatas={setDatas}
                    setLoaded={setLoaded}
                  />
                );
              })}
            </Container>
          </IonContent>
        </IonModal>
        <IonModal
          ref={modalPeriode}
          initialBreakpoint={0.75}
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
