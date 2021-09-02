import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { appTheme } from "./App/styles/appTheme";
import { Provider } from "react-redux";
import store, { persistor } from "./App/store";
// REDUX-PERSIST
import { PersistGate } from "redux-persist/integration/react";

import AppComponent from "./App/AppComponent";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider theme={appTheme}>
          <AppComponent />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
