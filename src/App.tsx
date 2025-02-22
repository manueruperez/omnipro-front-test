import "./App.css";
import Router from "./router";
import { ConfigProvider } from "antd";
import { darkTheme, lightTheme } from "./theme";
import { useSelector } from "react-redux";
import { AppState } from "#store/store.ts";

function App() {
  const currentTheme = useSelector((state: AppState) => state.theme.theme);
  const antdTheme = currentTheme === "dark" ? darkTheme : lightTheme;

  return (
    <ConfigProvider theme={antdTheme}>
      <Router />
    </ConfigProvider>
  );
}

export default App;
