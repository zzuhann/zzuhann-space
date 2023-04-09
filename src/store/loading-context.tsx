import React, { createContext, useContext, useState } from "react";
import { Loading } from "../components/Loading/Loading";

interface LoadingType {
  showLoading: () => void;
  hideLoading: () => void;
}

export const LoadingContext = createContext<LoadingType>({
  showLoading: () => {},
  hideLoading: () => {},
});

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);
  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      {loading && <Loading />}
    </LoadingContext.Provider>
  );
};

export const useLoadingService = () => useContext(LoadingContext);
