import { API_ENDPOINT } from "../../config";
import AuthUser from "../../interfaces/types";

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: AuthUser | null }
  | { type: 'SET_ERROR'; payload: string | null }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { type: 'SET_FEED_DATA'; payload: any }; // Adjust the payload type based on data structure

type AuthState = {
  authUser: AuthUser | null;
  loading: boolean;
  error: string | null;
};

export const initialState: AuthState = {
  authUser: null,
  loading: false,
  error: null,
};

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_USER":
      return { ...state, authUser: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_FEED_DATA":
      return { ...state, feedData: action.payload };
    default:
      return state;
  }
};

export async function login({ username, password }: { username: string; password: string }): Promise<AuthUser> {
  const response = await fetch(`${API_ENDPOINT}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to log in");
  }

  return data;
}

export async function signup({ username, password }: { username: string; password: string; }): Promise<AuthUser> {
  const response = await fetch(`${API_ENDPOINT}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    if (data.message && data.message.code === "SQLITE_CONSTRAINT") {
      throw new Error("Username already exists. Please choose a different one.");
    } else {
      throw new Error(data.message || "Failed to sign up");
    }
  }

  return data;
}

export function logout(dispatch: React.Dispatch<AuthAction>) {
  dispatch({ type: "SET_USER", payload: null });
  sessionStorage.removeItem("authUser");
}

export type { AuthAction, AuthState };
