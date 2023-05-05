import { useReducer, useEffect, createContext } from 'react';
import MkdSDK from './utils/MkdSDK';

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      //TODO
      return {
        ...state,
        ...action.payload,
      };
    case 'LOGOUT':
      localStorage.clear('role');
      localStorage.clear('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem('role');
  if (errorMessage === 'TOKEN_EXPIRED') {
    dispatch({
      type: 'LOGOUT',
    });
    window.location.href = '/' + role + '/login';
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    //TODO
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');

      if (token && role) {
        try {
          const request = await sdk.check('admin');
          const data = await request.json();
          console.log(data);
          tokenExpireError(dispatch, data.message);
        } catch (error) {
          console.log(error);
        }
      }
    };
    checkTokenValidity();
  }, [state]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
