import React, { createContext, useContext, useState } from 'react';

// Create the context
const RequestContext = createContext();

// Create a provider component
export const RequestProvider = ({ children }) => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);

  return (
    <RequestContext.Provider value={{ description, setDescription, location, setLocation }}>
      {children}
    </RequestContext.Provider>
  );
};

// Create a custom hook to use the context
export const useRequest = () => {
  return useContext(RequestContext);
};
