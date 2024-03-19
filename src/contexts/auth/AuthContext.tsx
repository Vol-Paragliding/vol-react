import { createContext, useReducer, useEffect } from "react";
import { AuthAction, AuthState, initialState, authReducer } from "./AuthSlice";

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

interface AuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState, () => {
    const storedUser = sessionStorage.getItem("authUser");
    return storedUser
      ? { ...initialState, authUser: JSON.parse(storedUser) }
      : initialState;
  });

  useEffect(() => {
    if (state.authUser) {
      sessionStorage.setItem("authUser", JSON.stringify(state.authUser));
    } else {
      sessionStorage.removeItem("authUser");
    }
  }, [state.authUser]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
