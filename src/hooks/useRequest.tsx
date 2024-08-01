import { request } from "../services";
import { useAuth } from "./useAuth";

const useRequest = () => {
  const { user } = useAuth();
  const headers = {
    headers: {
      'Authorization' : `Bearer ${user?.token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const get = (endPoint: any, setData: any,setLoaded:any) => {
    request
      .get(endPoint,headers)
      .then((res: any) => {
        console.log(res.data);
        setData(res.data.data);
        setLoaded(true)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const post = (endPoint: any, setData: any) => {
    request
      .post(endPoint)
      .then((res: any) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    get,
    post,
  };
};

export default useRequest;
