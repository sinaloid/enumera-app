import { useAuth, useDataProvider } from "../../../hooks";
import useFunction from "../../../hooks/useFunction";
import {request } from "../../../services";

const useRequestEvaluation = () => {
  const { updateDataShared } = useFunction();
  const { user } = useAuth();
  const { dataShared, setDataShared } = useDataProvider();
  const headers = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const getEvaluation = async ( endPoint:any, setDatas: any, setQuestions:any, setLoaded : any = () => {}) => {
    await request
      .get(endPoint, headers)
      .then((res: any) => {
        console.log(res.data.data)
        const tab = res.data.data.question_lecons.map((data : any) => {
          data.choix = data.choix.split(';');
          return data
        })
        setQuestions(tab[0])
        console.log(tab[0])
        setDatas({
          ...res.data.data,
          question_lecons:tab
        })
        setLoaded(true)
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const getEvaluationTest = async ( endPoint:any, setDatas: any, setQuestions:any, setLoaded : any = () => {}) => {
    await request
      .get(endPoint, headers)
      .then((res: any) => {
        console.log(res.data.data)
        const tab = res.data.data.questions.map((data : any) => {
          data.choix = data.choix.split(';');
          return data
        })
        setQuestions(tab[0])
        console.log(tab[0])
        setDatas({
          ...res.data.data,
          question_lecons:tab
        })
        setLoaded(true)
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const get = async ( endPoint:any, setDatas: any, setLoaded : any = () => {}) => {
    await request
      .get(endPoint, headers)
      .then((res: any) => {
        console.log(res.data.data)
        setDatas(res.data.data);
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
    getEvaluation,
    getEvaluationTest
  };
};

export default useRequestEvaluation;
