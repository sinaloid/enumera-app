import { IonHeader, IonToolbar, IonButtons, IonTitle } from "@ionic/react";
import Container from "./Container";
import { useAuth } from "../hooks";
import { Option } from "./Option";
import { BASE_URL } from "../services/request";
import logo from "../assets/images/logo.png";

interface PropsHeader {
    idPopover:any
    childen? : any
}
export const ContentHeader : React.FC<PropsHeader> = ({idPopover, childen}) => {
  const { user } :any = useAuth();

  return (
    <IonHeader>
      <Container>
        <IonToolbar>
          <IonButtons slot="start">
            <div className="d-flex align-items-center">
              <img
                className="rounded-5"
                width={"48px"}
                src={user?.image ? BASE_URL+user?.image : logo}
              />
              <div className="ms-2 line-height">
                <div className="fw-bold text-uppercase text-14 line-height">
                  {user?.nom + " " + user?.prenom}
                </div>
                <div className="text-12 text-muted">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </IonButtons>
          {/** */}
          <IonTitle></IonTitle>
          {childen}
          <Option idPopover={idPopover} />
        </IonToolbar>
      </Container>
    </IonHeader>
  );
};
