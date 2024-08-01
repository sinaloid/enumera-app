import { useContext } from "react";
import { DataContext } from "../context";

const useDataProvider = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useDataProvider
