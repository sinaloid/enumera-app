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
import { notifications, ellipsisVertical } from "ionicons/icons";
import React from "react";

interface Props {
    idPopover:any
}
export const Option : React.FC <Props> = ({idPopover}) => {
  const { logout } = useAuth();
  const { navigate } = useNavigate();

  const deconnection = (e: any) => {
    logout();
    navigate(e, "login");
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
            <IonItem button={true} detail={false}>
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
