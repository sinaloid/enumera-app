import { useAuth, useDataProvider } from "../../../hooks";
import useFunction from "../../../hooks/useFunction";
import {request } from "../../../services";

const useRequestLecon = () => {
  const { updateDataShared } = useFunction();
  const { user } = useAuth();
  const { dataShared, setDataShared } = useDataProvider();
  const headers = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const get = async ( endPoint:any, setDatas: any, setLoaded : any = () => {}) => {
    await request
      .get(endPoint, headers)
      .then((res: any) => {
        //console.log(res.data.data)
        setDatas([res.data.data.cours]);
        setLoaded(true)
        /*setDataShared({
          ...dataShared,
          periode: periode,
          classe: res.data.data[0],
        });*/
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return {
    get,
  };
};

export default useRequestLecon;
