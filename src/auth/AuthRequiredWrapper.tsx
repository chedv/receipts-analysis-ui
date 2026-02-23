import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import type {ReactNode} from "react";
import {Box, CircularProgress} from "@mui/material";
import sx from "../App.module.css";

const WrappedComponent = ({children}: {children: ReactNode}) => {
  const {error} = useAuth0();
  if (error) {
    return (
      <Box className={sx.centeredBox}>
        An error occurred during authentication: {error.message}
      </Box>
    );
  }
  return <>{children}</>;
};

const AuthRequiredWrapper = withAuthenticationRequired(WrappedComponent, {
  onRedirecting: () => (
    <Box className={sx.centeredBox}>
      <CircularProgress size="75px"/>
    </Box>
  )
});

export default AuthRequiredWrapper;