/* eslint-disable */
// Chakra Imports
import {
  Box,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import NavbarLinks from "./NavbarLinks";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { SearchBar } from "../Searchbar";
import gameData from "../../utitlities/GAME_DATA";
import { useDispatch } from "react-redux";
import { setGameList } from "../../../slice/gameList";
export default function AdminNavbar(props: {
  secondary: boolean;
  brandText: string;
  logoText: string;
  fixed: boolean;
  onOpen: (...args: any[]) => any;
}) {
  const [_scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);

    return () => {
      window.removeEventListener("scroll", changeNavbar);
    };
  });

  const { secondary, brandText } = props;
  const isHome = window?.location?.href?.includes("home");
  const [_searchQuery, setSearchQuery] = useState("");
  const delay = 500;
  let searchTimer:number;

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  let mainText = useColorModeValue("navy.700", "white");
  let navbarPosition = "fixed" as const;
  let navbarFilter = "none";
  let navbarBackdrop = "blur(20px)";
  let navbarShadow = "none";
  let navbarBg = useColorModeValue(
    "rgba(244, 247, 254, 0.2)",
    "rgba(11,20,55,0.5)"
  );
  let navbarBorder = "transparent";
  let secondaryMargin = "0px";
  let paddingX = "15px";
  let gap = "0px";
  let menuBg = useColorModeValue('white', 'navy.800');
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );

  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    clearTimeout(searchTimer);

    // Start a new timer to delay the search
    searchTimer = setTimeout(() => {
      // Filter the game data based on the search query
      const filteredData = gameData?.filter((game) =>
        game.name.toLowerCase().includes(query.toLowerCase())
      );

      dispatch(setGameList(filteredData));
    }, delay);
  };

  const navigate = useNavigate();

  return (
    <Box
      position={navbarPosition}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius="16px"
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: "center" }}
      display={secondary ? "block" : "flex"}
      minH="75px"
      justifyContent={{ xl: "center" }}
      lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      pb="8px"
      right={{ base: "12px", md: "30px", lg: "30px", xl: "30px" }}
      px={{
        sm: paddingX,
        md: "10px",
      }}
      ps={{
        xl: "12px",
      }}
      pt="8px"
      top={{ base: "12px", md: "16px", xl: "18px" }}
      width={"97%"}
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: "column",
          md: "row",
        }}
        alignItems={{ xl: "center" }}
        mb={gap}
      >
        <Box mb={{ sm: "8px", md: "0px" }}>
          <Flex>
            {!isHome && (
              <IconButton
                aria-label="nav"
                as={ArrowBackIcon}
                width={"20px"}
                height={"30px"}
                color={mainText}
                _hover={{ cursor: "pointer" }}
                onClick={() => navigate("/home")}
              ></IconButton>
            )}
            <Text
              color={mainText}
              bg="inherit"
              borderRadius="inherit"
              fontWeight="bold"
              fontSize="34px"
              _hover={{ color: { mainText }, cursor: !isHome ? "pointer" : "" }}
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              onClick={() => navigate("/home")}
              _focus={{
                boxShadow: "none",
              }}
            >
              {brandText}
            </Text>
          </Flex>
        </Box>
        <Box ms="auto" w={{ sm: "100%", md: "unset" }}>
          <Flex
		    w={{ sm: "100%", md: "auto" }}
			alignItems="center"
			flexDirection="row"
			bg={menuBg}
			flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
			p="10px"
			borderRadius="30px"
			boxShadow={shadow}
		  >
		

            {isHome && (
              <SearchBar
			  mt='5px'
                mb={() => {
                  if (secondary) {
                    return { base: "10px", md: "unset" };
                  }
                  return "unset";
                }}
                me="10px"
                borderRadius="30px"
                onSearch={handleSearch}
              />
            )}
            <NavbarLinks secondary={false} />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
