import { IonIcon } from "@ionic/react";
import { useDataProvider } from "../hooks";
import { chevronForward } from "ionicons/icons";
import { useParams } from "react-router";

const LinkList = () => {
  const { dataShared }: any = useDataProvider();
  const {matiereSlug,chapitreSlug,leconSlug} : any = useParams()

  return (
    <div className="d-flex align-items-center flex-wrap text-12 ">
      {dataShared?.periode?.label && (
        <>
          <span className="text-primary me-1">
            {dataShared?.periode?.label}
          </span>
          <IonIcon icon={chevronForward} />
        </>
      )}
      {matiereSlug && (
        <>
          <span className="text-primary me-1">
            {dataShared?.matiere?.label}
          </span>
          <IonIcon icon={chevronForward} />
        </>
      )}
      {chapitreSlug && (
        <>
          <span className="text-primary me-1">
            {dataShared?.chapitre?.label}
          </span>
          <IonIcon icon={chevronForward} />
        </>
      )}
      {leconSlug && (
        <>
          <span className="text-primary me-1">{dataShared?.lecon?.label}</span>
          <IonIcon icon={chevronForward} />
        </>
      )}
    </div>
  );
};

export default LinkList
