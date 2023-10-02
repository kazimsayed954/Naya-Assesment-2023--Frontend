import { Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PageNotFound from "./components/404";

import "./App.css";
import LandingPage from "./components/LandingPage";
// import AdminNavbar from "./components/NavBar";
import Game from "./components/TicTacToe";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MineSweeperGame from '../src/components/Games/MineSweeper/index';
// import PrivateRoute from "../HOC/PrivateRoute";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const authState = useSelector((state: any) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (
      (authState?.isAuthenticated &&
        Object.keys(authState?.user ?? {})?.length > 1 &&
        authState?.token) ||
      localStorage?.getItem("id-token")?.length > 25
    ) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <>
      <main>
        <Routes>
          {!isAuthenticated && (
            <>
              <Route path={`/`} Component={SignIn} />
              <Route path={`/signin`} Component={SignIn} />
              <Route path={`/signup`} Component={SignUp} />
              <Route path={`*`} Component={SignIn} />
            </>
          )}
          {isAuthenticated && (
            <>
              <Route path={`/`} Component={LandingPage} />
              <Route path={`/signin`} Component={LandingPage} />
              <Route path={`/home`} Component={LandingPage} />
              <Route path={`/game`} Component={Game} />
              <Route path={`/game/minesweeper/:id?`} Component={MineSweeperGame} />
            </>
          )}
          {/* <PrivateRoute
            path="/home"
            component={LandingPage}
            isAuthenticated={true}
          /> */}
        </Routes>
      </main>
    </>
  );
}

export default App;
