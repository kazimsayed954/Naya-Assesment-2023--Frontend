import React from "react";
import MultiplayerT3 from "../TicTacToe/Multiplayer/index";

import withNavbar from "../../../../HOC/withNavbar";
import CustomCard from "../../Card";
import { Box, Flex } from "@chakra-ui/react";
import GameStateColumn from "../../GameState";
import TicTacToeVsComputer from "./VsComputer";
import PageNotFound from "../../404";
const TicTacToe = () => {
    const isMultiplyer = window.location.href?.includes("multiplayer");
    const isVsComputer = window.location.href?.includes("computer");
  return (
    <div>
      <CustomCard height={"100vh"} flexDirection="column" w="100%" p="34px">
        <Box
         mt={{ base: "5%", xl: "5%",md:'10%',sm:'15%' }}
        >
          <Flex>
            <Box width={{ base: "70%" }}>
                {
                    isMultiplyer ? <MultiplayerT3 /> : isVsComputer ? <TicTacToeVsComputer/> : <PageNotFound/>
                }
            </Box>
            <Box width={{ base: "30%" }}>
              <GameStateColumn gametype={"tictactoe"} />
            </Box>
          </Flex>
        </Box>
      </CustomCard>
    </div>
  );
};

export default withNavbar(TicTacToe);
