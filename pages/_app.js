import "../styles/globals.css";
import "../styles/fonts.css";
import { ThemeProvider } from "theme-ui";
import theme from "../styles/theme";
import Header from "../components/Header";
import Container from "../components/Container";
import { useReducer } from "react";
import AuthContext, {
  authReducer,
  getInitialState,
} from "../context/auth.context";

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(authReducer, {}, getInitialState);
  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{ state, dispatch }}>
        <Container>
          <Header />
          <Component {...pageProps} />
        </Container>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
