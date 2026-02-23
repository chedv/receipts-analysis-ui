import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {addAccessTokenInterceptor} from "../api.ts";

const AuthTokenInterceptor = () => {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      addAccessTokenInterceptor(getAccessTokenSilently);
    }
  }, [isLoading, isAuthenticated, getAccessTokenSilently]);

  return null;
};

export default AuthTokenInterceptor;