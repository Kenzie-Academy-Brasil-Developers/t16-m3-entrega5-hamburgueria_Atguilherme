import Router from "./routes";
import { GlobalStyles } from "./styles/global";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./providers/UserContext";

const App = () => (
  <>
    <GlobalStyles />
    <ToastContainer autoClose={1500} />
    <UserProvider>
      <Router />
    </UserProvider>
  </>
);

export default App;
