import { createContext, useReducer, useEffect } from "react";

import { AuthAction, AuthState, initialState, authReducer } from "./AuthSlice";

export const AuthContext = createContext<{
  authState: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  authState: initialState,
  dispatch: () => null,
});

interface AuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState, () => {
    const storedUser = sessionStorage.getItem("authUser");
    const user = storedUser ? JSON.parse(storedUser) : null;
    return {
      ...initialState,
      authUser: user,
      isAuthenticated: !!user,
    };
  });

  useEffect(() => {
    if (authState.authUser) {
      sessionStorage.setItem("authUser", JSON.stringify(authState.authUser));
    } else {
      sessionStorage.removeItem("authUser");
    }
  }, [authState, authState.authUser]);

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
