import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeProvider";
import TanstackProvider from "./providers/TanstackProvider";
import MainRoutes from "./routes/MainRoutes";

const App = () => {
  return (
    <>
      <TanstackProvider>
        <AuthContextProvider>
          <ThemeProvider defaultTheme="light" storageKey="blog-theme">
            <ToastContainer
              theme="light"
              toastClassName="!bg-background !text-foreground border border-border shadow-md rounded-md"
              progressStyle={{ background: "hsl(var(--primary))" }}
            />
            <MainRoutes />
          </ThemeProvider>
        </AuthContextProvider>
      </TanstackProvider>
    </>
  );
};

export default App;
