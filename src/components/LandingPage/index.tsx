import GameCard from "../GameCard";
import { SimpleGrid, Box, Center } from "@chakra-ui/react";
import withNavbar from "../../../HOC/withNavbar";
import gameData from "../../utitlities/GAME_DATA";

const LandingPage = () => {
  return (
    <Box mt={{ base: '10%', sm: '180px  ', md: '150px' }}>
      <Center>
        <SimpleGrid columns={{ base: 1, sm: 1, md: 3, lg: 4, xl: 4 }} gap="20px">
          {gameData?.map((game, index) => (
            <GameCard
              name={game?.name}
              subtitle={game?.subtitle}
              players={game?.players}
              image={game?.image}
              path={game?.path}
              highestscore={game?.highestscore}
              key={index ** 2 + 5 + "0"}
            />
          ))}
        </SimpleGrid>
      </Center>
    </Box>
  );
};

export default withNavbar(LandingPage);
