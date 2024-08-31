import { IonIcon, IonModal, IonContent } from "@ionic/react";
import { chevronDown } from "ionicons/icons";
import { useState, useRef, useEffect } from "react";
import { useAuth, useRequest, useNavigate, useDataProvider } from "../hooks";
import { Classe, Periode } from "../pages/matiere/components";
import useRequestMatiere from "../pages/matiere/hooks/useRequest";
import Container from "./Container";
import { ClasseSvg, SuccessSvg } from "./svg";

interface ContainerProps {
    onChange: any;
    setLoaded:any
  }
  const ClassePeriodeSelect: React.FC<ContainerProps> = ({
    onChange,setLoaded
  }) => {
    const { user } = useAuth();
    const [periodes, setPeriodes] = useState<any>([]);
    const [classes, setClasses] = useState<any>([]);
    const { getPeriodeClasse } = useRequestMatiere();
    const modalPeriode = useRef<HTMLIonModalElement>(null);
    const modalClasse = useRef<HTMLIonModalElement>(null);
    const { dataShared }: any = useDataProvider();
    const [isFirstTime, setIsFirstTime] = useState(true);
  
    useEffect(() => {
      getPeriodeClasse(setPeriodes, setClasses, isFirstTime, setIsFirstTime);
    }, []);
    
    return (
      <>
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
                    <span className="text-danger ps-2 fw-bold">En attente</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12 mt-2 text-14 py-2 text-center bg-gray">
              Messages défilantes : Actualités et évènements
            </div>
          </div>
        </div>
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
                    onChange={onChange}
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
                    setLoaded={setLoaded}
                    onChange={onChange}
                  />
                );
              })}
            </Container>
          </IonContent>
        </IonModal>
      </>
    );
  };

  export default ClassePeriodeSelect;