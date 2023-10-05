import { useEffect, useState, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Spinner } from "@chakra-ui/react";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import LandingPage from "./components/LandingPage";

import "./App.css";
const T3 = lazy(() => import("../src/components/Games/TicTacToe/index"));
const MineSweeperGame = lazy(
  () => import("../src/components/Games/MineSweeper/index")
);
function App() {
  const authState = useSelector((state: any) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  useEffect(() => {
    const tokenLength = localStorage?.getItem("id-token")?.length ?? 0;
    if (
      (authState?.isAuthenticated &&
        Object.keys(authState?.user ?? {})?.length > 1 &&
        authState?.token) ||
      tokenLength > 150
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
                <Route
                  path={`/`}
                  element={
                    <Suspense
                      fallback={
                        <div className="loading-container">Loading...</div>
                      }
                    >
                      <LandingPage />
                    </Suspense>
                  }
                />
                <Route path={`/signin`} element={<LandingPage />} />
                <Route path={`/home`} element={<LandingPage />} />
                <Route
                  path={`/game/tictactoe/multiplayer`}
                  element={
                    <Suspense
                      fallback={
                        <div className="loading-container">Loading...</div>
                      }
                    >
                      <T3 />
                    </Suspense>
                  }
                />
                <Route
                  path={`/game/tictactoe/computer/:id?`}
                  element={
                    <Suspense
                      fallback={
                        <div className="loading-container">Loading...</div>
                      }
                    >
                      <T3 />
                    </Suspense>
                  }
                />
                <Route
                  path={`/game/minesweeper/:id?`}
                  element={
                    <Suspense
                      fallback={
                        <div className="loading-container">Loading...</div>
                      }
                    >
                      <MineSweeperGame />
                    </Suspense>
                  }
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
