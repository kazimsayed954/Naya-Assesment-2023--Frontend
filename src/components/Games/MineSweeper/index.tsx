import MineSweeper from "./Game/Board";
import withNavbar from "../../../../HOC/withNavbar";
import GameStateColumn from "../../GameState/index";
import CustomCard from "../../Card";
import { Flex, Box } from "@chakra-ui/react";
const MineSweeperGame = () => {
  return (
    <div>
    <CustomCard height={'100vh'} flexDirection="column" w="100%" p="34px">
        <Box mt={'6%'}>
        <Flex>
            <Box 
            width={{base:'70%'}}
            >
              <MineSweeper />
            </Box>
            <Box
             width={{base:'30%'}}
            >
              <GameStateColumn gametype={'minesweeper'} />
            </Box>
        </Flex>
        </Box>
      </CustomCard>
    </div>
  );
};

export default withNavbar(MineSweeperGame);
