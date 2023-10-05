import MineSweeper from "./Game/Board";
import withNavbar from "../../../../HOC/withNavbar";
import GameStateColumn from "../../GameState/index";
import { Flex, Box, useMediaQuery } from "@chakra-ui/react";
const MineSweeperGame = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <div>
      <Box
        height={"100vh"}
        flexDirection="column"
        w="100%"
        p="34px"
        mt={{ base: isMobile ? "0" : "5%", xl: "1%", md: "10%", sm: "100px" }}
      >
        <Box mt={{ base: "0", md: "5%" }}>
          <Flex flexDir={isMobile ? "column" : "row"}>
            <Box
              width={{ base: "100%", md: isMobile ? "100%" : "70%" }}
              mb={isMobile ? "20px" : "0"}
            >
              <MineSweeper />
            </Box>
            <Box width={{ base: "100%", md: "30%" }} ml={{base:'10px'}}>
              <GameStateColumn gametype={"minesweeper"} />
            </Box>
          </Flex>
        </Box>
      </Box>
    </div>
  );
};

export default withNavbar(MineSweeperGame);
