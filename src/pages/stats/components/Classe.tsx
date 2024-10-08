import { IonIcon } from "@ionic/react";
import {
  chevronForward,
  radioButtonOffOutline,
  radioButtonOnOutline,
} from "ionicons/icons";
import React from "react";
import useFunction from "../../../hooks/useFunction";
import { ClasseSvg } from "../../../components/svg";

interface ContainerProps {
  data: any;
  isActive: boolean;
  modal: any;
}

const Classe: React.FC<ContainerProps> = ({ data, isActive, modal }) => {
  const { updateDataShared } = useFunction();

  return (
    <div
      className="col-12 px-0 bg-primary-light mb-3"
      onClick={(e: any) => {
        e.preventDefault();
        updateDataShared("classe", data);
        modal.current?.dismiss();
      }}
    >
      <div className="d-flex">
        <div className="bg-primary text-center  p-2" style={{ minWidth: "83px" }}>
          <span className="text-white fw-bold">
            <ClasseSvg />
          </span>
        </div>
        <div className="w-100 text-primary position-relative">
          <div className="d-flex align-items-center p-2">
            <span className="fw-bold me-auto">{data.label}</span>
            {isActive ? (
              <IonIcon icon={radioButtonOnOutline} />
            ) : (
              <IonIcon icon={radioButtonOffOutline} />
            )}
            {/**<ion-icon name="radio-button-on-outline"></ion-icon> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classe;
