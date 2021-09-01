import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { appTheme } from "./App/styles/appTheme";
import { Provider } from "react-redux";
import { store } from "./App/store";

import AppComponent from "./App/AppComponent";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={appTheme}>
        <AppComponent />
      </PaperProvider>
    </Provider>
  );
}
