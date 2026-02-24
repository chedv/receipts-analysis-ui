import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import AuthProvider from "./auth/AuthProvider.tsx";
import AuthRequiredWrapper from "./auth/AuthRequiredWrapper.tsx";
import AuthTokenInterceptor from "./auth/AuthTokenInterceptor.tsx";
import {Provider} from "react-redux";
import store from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <AuthRequiredWrapper>
      <Provider store={store}>
        <AuthTokenInterceptor/>
        <App/>
      </Provider>
    </AuthRequiredWrapper>
  </AuthProvider>,
)
