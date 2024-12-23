import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import RefreshPage from "./RefreshPage";

interface ContainerProps {
  children?: any;
  classNameGrid?: any;
  classNameRow?: any;
  classNameCol?: any;
  sizeMd?: any;
}

const Container: React.FC<ContainerProps> = ({
  children,
  classNameGrid,
  classNameRow,
  classNameCol,
  sizeMd = 8,
}) => {
  return (
    <>
    <RefreshPage />
      <IonGrid class={classNameGrid}>
        <IonRow class={"ion-justify-content-center " + classNameRow}>
          <IonCol sizeMd={sizeMd} class={classNameCol}>
            {children}
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default Container;
