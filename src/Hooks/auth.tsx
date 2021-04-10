import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useHistory } from 'react-router-dom';

import IUser from 'Entities/IUser';
import ISignInDTO from 'DTOs/ISignInDTO';

import localStorageConfig from 'Config/localStorage';

import api from 'Services/api';

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

interface IAuthContextData {
  user: IUser;
  signIn: (data: ISignInDTO) => Promise<void>;
  signOut: () => Promise<void>;
  handleSetUser: (data: IUser) => void;
}

export const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();

  const [user, setUser] = useState<IUser>({} as IUser);

  const signIn = useCallback(async ({ email, password }: ISignInDTO) => {
    const response = await api.post('/users/sessions', {
      email,
      password,
    });
    localStorage.setItem(
      localStorageConfig.user_identifier,
      JSON.stringify(response.data),
    );
    setUser(response.data);
  }, []);

  const signOut = useCallback(async () => {
    await api.delete('/users/signout');
    localStorage.removeItem(localStorageConfig.user_identifier);
    setUser({} as IUser);
    history.replace('/');
  }, [history]);

  const handleSetUser = useCallback(
    (data: IUser) => {
      const newUser = { ...user };
      Object.assign(newUser, data);
      setUser(newUser);
      localStorage.setItem(
        localStorageConfig.user_identifier,
        JSON.stringify(user),
      );
    },
    [user],
  );

  useEffect(() => {
    const savedUser = localStorage.getItem(localStorageConfig.user_identifier);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    // api.get('/users/sessions').catch(() => {
    //   signOut();
    // });
  }, [signOut]);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, handleSetUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthProvider;
