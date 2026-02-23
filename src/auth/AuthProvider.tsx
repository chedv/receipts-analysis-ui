import {config} from "../config.ts";
import {Auth0Provider} from "@auth0/auth0-react";
import type {ReactNode} from "react";

const AuthProvider = ({children}: {children: ReactNode}) => {
  return (
    <Auth0Provider
      domain={config.auth0Domain}
      clientId={config.auth0ClientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: config.auth0ApiAudience,
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;