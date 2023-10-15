import React from 'react';
import { useSelector } from 'react-redux'; 
import { RootState } from '@/app/Redux/MainStore/rootReducer'; 

const LoadingIndicator: React.FC = () => {
  const {isLoading} = useSelector((state: RootState) => state.user); 

  if (!isLoading) {
    return null; 
  }

  return (
    <div className="fixed top-0 left-0 h-1 bg-blue-500 w-full animate-loading-line"></div>

  );
};

export default LoadingIndicator;
