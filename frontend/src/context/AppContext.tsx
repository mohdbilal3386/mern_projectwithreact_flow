import React, { SetStateAction, useState } from "react";
import { createContext } from "react";

interface AppContextTypes {
  nodeType: string;
  setNodeType: React.Dispatch<SetStateAction<string | null>>;
}

export const AppContext = createContext<AppContextTypes | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [nodeType, setNodeType] = useState(null);
  return (
    <AppContext.Provider value={{ nodeType, setNodeType }}>
      {children}
    </AppContext.Provider>
  );
};
