import { ThemeProvider } from "./context/ThemeProvider";
import MainRoutes from "./routes/MainRoutes";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <MainRoutes />;
      </ThemeProvider>
    </>
  );
};

export default App;
