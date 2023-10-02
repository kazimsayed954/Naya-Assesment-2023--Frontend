import React from "react";
import GameCard from "../GameCard";
import { SimpleGrid, Box,Center } from "@chakra-ui/react";
import withNavbar from "../../../HOC/withNavbar";
import gameData from "../../utitlities/GAME_DATA";

const LandingPage = () => {
  return (
    <Box mt={"10%"}>
      <Center>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="20px">
      
        {gameData?.map((game,index) => (
           <GameCard
           name={game?.name}
           subtitle={game?.subtitle}
           players={game?.players}
           image={game?.image}
           path={game?.path}
           highestscore={game?.highestscore}
           key={index**2}
         />
        ))}
      </SimpleGrid>
      </Center>
    </Box>
  );
};

export default withNavbar(LandingPage);
