import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Loading } from "./components/Loading.jsx";
import { AppRouter } from "./routes/AppRouter.jsx";
import { Provider } from "react-redux";
import { store } from "./state/store.js";

export const PageWithHeader = ({ children }) => (
  <div className="flex h-full flex-col">{children}</div>
);

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense
        fallback={
          <PageWithHeader>
            <Loading name="suspense" />
          </PageWithHeader>
        }
      >
        <AppRouter />
      </Suspense>
    </BrowserRouter>
  </Provider>
);
