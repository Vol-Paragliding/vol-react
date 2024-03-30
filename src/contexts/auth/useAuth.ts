import { useContext } from 'react';

import { AuthContext } from './AuthContext';
import { AuthState, AuthAction } from './AuthSlice';

export const useAuth = (): { authState: AuthState; dispatch: React.Dispatch<AuthAction> } => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  const { authState, dispatch } = context;
  return { authState, dispatch };
};
