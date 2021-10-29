import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect
} from "react";

import { useRouter } from "next/router";

import { useMutation, gql } from '@apollo/client';
import { AUTH_TOKEN } from '../services/constants';
import { User } from "../services/api-types";


type LoginCredentials = {
  email: string;
  password: string;
};

type SignUpData = { name: string } & LoginCredentials

type UserContextData = Omit<User, "links">;

type AuthContextData = {
  login: (credentials: LoginCredentials) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  logout: () => void;
  user: UserContextData | null;
  authToken: string | null;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password) {
      token
      user {
        name
        id
        email
      }
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(
      email: $email
      password: $password
      name: $name
    ) {
      token
      user {
        name
        id
        email
      }
    }
  }
`;

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();

  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserContextData | null>(null);
  const isAuthenticated = !!user;

  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [signUpMutation] = useMutation(SIGNUP_MUTATION);

  async function redirectToHome(token: string): Promise<void> {
    localStorage.setItem(AUTH_TOKEN, token);
    router.push('/');
  }

  async function login({ email, password }: LoginCredentials) {
    await loginMutation({
      variables: {
        email,
        password
      },

      onCompleted: ({ data }) => {
        setUser({
          id: data.id,
          name: data.name,
          email
        });

        redirectToHome(data.token);
      }
    })
  }

  async function signUp({ name, email, password }: SignUpData) {
    await signUpMutation({
      variables: {
        name,
        email,
        password,
      },
      onCompleted: ({ data }) => {
        setUser({
          id: data.id,
          name,
          email
        });

        redirectToHome(data.token);
      }
    })
  }

  async function logout() {
    setUser(null);
    localStorage.removeItem(AUTH_TOKEN);
    await router.push(`/`);
  }

  useEffect(() => {
    const AuthToken = localStorage.getItem(AUTH_TOKEN);
    setAuthToken(AuthToken);
  }, [authToken]);

  if (authToken !== null && typeof authToken !== 'string') {
    return null;
  }


  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isAuthenticated,
        user,
        authToken,
        signUp
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}