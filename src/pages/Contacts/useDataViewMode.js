import { useEffect, useState } from "react";
import { DATA_VIEW_MODES } from './constants';

const getInitialDataViewMode = () => localStorage.getItem("dataViewMode") || DATA_VIEW_MODES.GRID;

export const useDataViewMode = () => {
  
    const [dataViewMode, setDataViewMode] = useState(getInitialDataViewMode);
  
    useEffect(() => {
      localStorage.setItem("dataViewMode", dataViewMode);
    }, [dataViewMode]);
    
    return [dataViewMode, setDataViewMode];
  };