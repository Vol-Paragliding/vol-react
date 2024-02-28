import { createContext, useState, useContext } from "react";

interface AuthContextType {
  authDetails: any;
  setAuthDetails: React.Dispatch<React.SetStateAction<any>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authDetails, setAuthDetails] = useState(null);

  return (
    <AuthContext.Provider value={{ authDetails, setAuthDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
