import React from "react";
import { request } from "../../../services";
import { useNavigate } from "../../../hooks";

const useRequest = () => {
  const { navigate } = useNavigate();
  const get = (endPoint: any, setData: any) => {
    request
      .get(endPoint)
      .then((res: any) => {
        console.log(res.data);
        setData(res.data.data)
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

  const createCompte = (
    endPoint: any,
    data: any,
    setIsCreated: any,
    dismiss: any,
    setError: any
  ) => {
    //alert(JSON.stringify(data, null, 2));

    request
      .post(endPoint, data)
      .then((res: any) => {
        console.log(res.data);
        setIsCreated(true)
        localStorage.setItem('email',res.data.data.email)
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

  const verifyOtp = (
    endPoint: any,
    data: any,
    setIsCreated: any,
    dismiss: any,
    setError: any
  ) => {
    //alert(JSON.stringify(data, null, 2));

    request
      .post(endPoint, data)
      .then((res: any) => {
        console.log(res.data);
        setIsCreated(true)
        localStorage.removeItem('email')
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

  const getOtp = (
    endPoint: any,
    data: any,
    dismiss: any,
    setError: any
  ) => {
    //alert(JSON.stringify(data, null, 2));

    request
      .post(endPoint, data)
      .then((res: any) => {
        console.log(res.data);
        
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
    createCompte,
    verifyOtp,
    getOtp
  };
};

export default useRequest;
