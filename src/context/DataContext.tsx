import React, { createContext, useState } from "react";

const initDataShared = {
  dataShared: {
    classe: {},
    periode: {},
    matiere: {},
    chapitre: {},
    lecon: {},
  },
  setDataShared: (data: any) => {},
};

export const DataContext = createContext({
  ...initDataShared
});

interface ContainerProps {
  children: any;
}
export const DataProvider: React.FC<ContainerProps> = ({ children }) => {
  const [dataShared, setDataShared] = useState(initDataShared.dataShared);

  return (
    <DataContext.Provider value={{ dataShared, setDataShared }}>
      {children}
    </DataContext.Provider>
  );
};
