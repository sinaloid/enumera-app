import useDataProvider from "./useDataProvider";

const useFunction = () => {
  const { dataShared, setDataShared } = useDataProvider();

  const updateDataShared = async (key: any, data: any) => {
    await setDataShared({
      ...dataShared,
      [key]: data,
    });
    localStorage.setItem(key,data.slug)
  };

  return {
    updateDataShared,
  };
};

export default useFunction;
