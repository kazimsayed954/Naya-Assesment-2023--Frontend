import MultiplayerT3 from "../TicTacToe/Multiplayer/index";
import withNavbar from "../../../../HOC/withNavbar";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import GameStateColumn from "../../GameState";
import TicTacToeVsComputer from "./VsComputer";
import PageNotFound from "../../404";

const TicTacToe = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const isMultiplyer = window.location.href?.includes("multiplayer");
  const isVsComputer = window.location.href?.includes("computer");

  return (
    <div>
      <Box
        height={"100vh"}
        flexDirection="column"
        w="100%"
        p="34px"
        mt={{ base: isMobile ? "0" : "5%", xl: "5%", md: "10%", sm: "100px" }}
      >
        <Box mt={{ base: "0", md: "20px",sm:'5%' }}>
          <Flex flexDir={isMobile ? "column" : "row"}>
            <Box
              width={{ base: "100%", md: isMobile ? "100%" : "70%" }}
              mb={isMobile ? "20px" : "0"}
            >
              {isMultiplyer ? (
                <MultiplayerT3 />
              ) : isVsComputer ? (
                <TicTacToeVsComputer />
              ) : (
                <PageNotFound />
              )}
            </Box>
            
              <Box width={{ base: "100%", md: "30%" }} ml={isMobile ? {} :{base:'20px'}}>
                <GameStateColumn gametype={isVsComputer ? "tictactoe" : ""} />
              </Box>
            
          </Flex>
        </Box>
      </Box>
    </div>
  );
};

export default withNavbar(TicTacToe);
