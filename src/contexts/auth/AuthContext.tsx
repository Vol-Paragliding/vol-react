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
      ? { ...initialState, user: JSON.parse(storedUser) }
      : initialState;
  });

  useEffect(() => {
    if (state.autUser) {
      sessionStorage.setItem("authUser", JSON.stringify(state.autUser));
    } else {
      sessionStorage.removeItem("authUser");
    }
  }, [state.autUser]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
