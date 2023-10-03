import React from "react";
import MultiplayerT3 from "../TicTacToe/Multiplayer/index";
import withNavbar from "../../../../HOC/withNavbar";
import CustomCard from "../../Card";
import { Box, Flex } from "@chakra-ui/react";
import GameStateColumn from "../../GameState";
const TicTacToe = () => {
  return (
    <div>
      <CustomCard height={"100vh"} flexDirection="column" w="100%" p="34px">
        <Box
         mt={{ base: "5%", xl: "5%",md:'10%',sm:'15%' }}
        >
          <Flex>
            <Box width={{ base: "70%" }}>
              <MultiplayerT3 />
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
