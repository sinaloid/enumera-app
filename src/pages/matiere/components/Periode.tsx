import { IonIcon } from "@ionic/react";
import {
  chevronForward,
  radioButtonOffOutline,
  radioButtonOnOutline,
} from "ionicons/icons";
import React from "react";
import { useDataProvider, useRequest } from "../../../hooks";
import useFunction from "../../../hooks/useFunction";
import { ClasseSvg } from "../../../components/svg";
import { endPoint } from "../../../services";

interface ContainerProps {
  data: any;
  isActive: boolean;
  modal: any;
  setDatas:any;
  setLoaded:any;
}

const Periode: React.FC<ContainerProps> = ({ data, isActive, modal,setDatas, setLoaded }) => {
  const { updateDataShared } = useFunction();
  const {get} = useRequest()
  const getMatiereOnClasseChange = (data: any) => {
    //get(endPoint.matieres + "/classe/" + data.slug, setDatas, setLoaded);
    const classe = localStorage.getItem('classe')
    get(endPoint.matieres+"/classe/"+classe+"/periode/"+data.slug, setDatas, setLoaded);
  };
  return (
    <div
      className="col-12 px-0 bg-primary-light mb-3"
      onClick={(e: any) => {
        e.preventDefault();
        updateDataShared("periode", data);
        setLoaded(false)
        getMatiereOnClasseChange(data)
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

export default Periode;
