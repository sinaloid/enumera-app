import { request } from "../services";

const useRequest = () => {
  const get = (endPoint: any, setData: any) => {
    request
      .post(endPoint)
      .then((res: any) => {
        console.log(res.data);
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
