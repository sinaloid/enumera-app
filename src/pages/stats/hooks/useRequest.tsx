import { useAuth, useDataProvider } from "../../../hooks";
import useFunction from "../../../hooks/useFunction";
import { endPoint, request } from "../../../services";
import { Classe } from "../components";

const useRequestMatiere = () => {
  const { updateDataShared } = useFunction();
  const { user } = useAuth();
  const { dataShared, setDataShared } = useDataProvider();
  const headers = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const getPeriodeClasse = async (setPeriodes: any, setClasses: any) => {
    await request
      .get(endPoint.periodes, headers)
      .then((res: any) => {
        setPeriodes(res.data.data);
        getClasse(res.data.data[0], setClasses);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const getClasse = async (periode: any, setClasses: any) => {
    await request
      .get(endPoint.classes, headers)
      .then((res: any) => {
        console.log(res.data.data)
        setClasses(res.data.data);
        setDataShared({
          ...dataShared,
          periode: periode,
          classe: res.data.data[0],
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return {
    getPeriodeClasse,
  };
};

export default useRequestMatiere;
