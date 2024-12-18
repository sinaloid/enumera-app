import {
  IonPopover,
  IonContent,
  IonList,
  IonItem,
  IonButton,
  IonButtons,
  IonIcon,
} from "@ionic/react";
import { useAuth, useNavigate } from "../hooks";
import {
  notifications,
  ellipsisVertical,
  chatbox,
  list,
  listCircle,
  listOutline,
  chatboxEllipses,
} from "ionicons/icons";
import React from "react";
import { useHistory } from "react-router";

interface Props {
  idPopover: any;
  childen?: any;
}
export const Option: React.FC<Props> = ({ idPopover, childen }) => {
  const { logout } = useAuth();
  const { navigate } = useNavigate();
  const history = useHistory();

  const deconnection = (e: any) => {
    logout();
    navigate(e, "login");
  };

  const goTo = (e: any, url: any) => {
    e.preventDefault();
    history.push(url);
  };

  return (
    <>
      <IonButtons slot="end">
        {/**
         * <IonButton className="back-circle">
          <IonIcon color="medium" className="text-24" icon={notifications} />
        </IonButton>
         */}
        <IonButton id={idPopover} className="back-circle">
          <IonIcon color="medium" className="text-24" icon={ellipsisVertical} />
        </IonButton>
      </IonButtons>
      <IonPopover trigger={idPopover} dismissOnSelect={true}>
        <IonContent>
          <IonList>
            <IonItem button={true} detail={false} onClick={e => goTo(e, '/messages')}>
              Actualités
            </IonItem>
            <IonItem button={true} detail={false} onClick={e => goTo(e, '/mon-compte')}>
              Mon comptes
            </IonItem>
            <IonItem button={true} detail={false} onClick={e => goTo(e, '/apropos')}>
              A propos
            </IonItem>
            <IonItem button={true} detail={false} onClick={deconnection}>
              Se deconnecter
            </IonItem>
          </IonList>
        </IonContent>
      </IonPopover>
    </>
  );
};
