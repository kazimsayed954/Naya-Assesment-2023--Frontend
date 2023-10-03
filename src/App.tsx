import { Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PageNotFound from "./components/404";

import "./App.css";
import LandingPage from "./components/LandingPage";
// import AdminNavbar from "./components/NavBar";
import T3 from "../src/components/Games/TicTacToe/index";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MineSweeperGame from "../src/components/Games/MineSweeper/index";
import { Box, Spinner } from "@chakra-ui/react";
// import PrivateRoute from "../HOC/PrivateRoute";
function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const authState = useSelector((state: any) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (
      (authState?.isAuthenticated &&
        Object.keys(authState?.user ?? {})?.length > 1 &&
        authState?.token) ||
      localStorage?.getItem("id-token")?.length > 25
    ) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [authState]);
  return (
    <>
      <main>
        {isLoading ? (
          <>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              height={"100vh"}
            >
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
                height={"300px"}
                width={"300px"}
              />
            </Box>
          </>
        ) : (
          <Routes>
            {!isAuthenticated && (
              <>
                <Route path={`/`} element={<SignIn />} />
                <Route path={`/signin`} element={<SignIn />} />
                <Route path={`/signup`} element={<SignUp />} />
                <Route path={`*`} element={<SignIn />} />
              </>
            )}
            {isAuthenticated && (
              <>
                <Route path={`/`} element={<LandingPage />} />
                <Route path={`/signin`} element={<LandingPage />} />
                <Route path={`/home`} element={<LandingPage />} />
                <Route path={`/game/tictactoe/:id?`} element={<T3 />} />
                <Route
                  path={`/game/minesweeper/:id?`}
                  element={<MineSweeperGame />}
                />
              </>
            )}
          </Routes>
        )}
      </main>
    </>
  );
}

export default App;
