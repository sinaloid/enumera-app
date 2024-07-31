import React from "react";
import { request } from "../../../services";
import { useNavigate } from "../../../hooks";

const useRequest = () => {
  const { navigate } = useNavigate();
  const get = (endPoint: any, login: any) => {
    request
      .post(endPoint)
      .then((res: any) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const post = (
    endPoint: any,
    data: any,
    login: any,
    dismiss: any,
    setError: any
  ) => {
    //alert(JSON.stringify(data, null, 2));

    request
      .post(endPoint, data)
      .then((res: any) => {
        console.log(res.data);
        login({
          token: res.data.access_token,
          ...res.data.user,
        });
        //setData(res.data);
        dismiss();
      })
      .catch((error) => {
        console.log(error);
        dismiss();
        const msg = error?.response?.data?.errors
          ? error?.response?.data?.errors
          : error?.response?.data?.error;
        setError(msg);
      });
  };

  return {
    get,
    post,
  };
};

export default useRequest;
