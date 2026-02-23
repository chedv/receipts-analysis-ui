import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import AuthProvider from "./auth/AuthProvider.tsx";
import AuthRequiredWrapper from "./auth/AuthRequiredWrapper.tsx";
import AuthTokenInterceptor from "./auth/AuthTokenInterceptor.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <AuthRequiredWrapper>
      <AuthTokenInterceptor/>
      <App/>
    </AuthRequiredWrapper>
  </AuthProvider>,
)
