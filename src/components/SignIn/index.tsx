import React, { ChangeEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import CustomCard from "../Card";
import { apiWithToken } from "../../utitlities/API";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../slice/auth";


// Custom components

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  interface FormData {
    email: string;
    password: string;
  }
  const [show, setShow] = React.useState({
    password: false,
    loader:false,
  });
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const handleClick = () => setShow((prev)=>({...prev,password:!show?.password}));

  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignIn = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShow((prev)=>({...prev,loader:true}));
    try {
      // Send a POST request to your API endpoint with formData
      const response = await apiWithToken.post("/api/v1/signin", formData);

      // Handle the response, e.g., store user data in state or redirect to another page
      console.log("API response:", response.data);
      if(response.status === 200){
        localStorage.setItem("id-token",JSON.stringify(response?.data?.token));
        localStorage.setItem("user",JSON.stringify(response?.data?.user));
        dispatch(loginSuccess({token:response?.data?.token,user:response?.data?.user}))
        navigate('/home')
        window.location.reload();
          
      }

      // Reset the form data
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error("API error:", error);
    }
    finally{
    setShow((prev)=>({...prev,loader:false}));
    }
  };

  return (
    <Flex
      justifyContent="center"
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
      mx={{ base: "10px", lg: "0px" }}
      minH="100vh"
    >
    <form onSubmit={handleSignIn}> {/* Wrap your content in a form */}

      <CustomCard
        w={{ base: "100%", md: "max-content" }}
        h="max-content"
        mx="auto"
        maxW="100%"
        p={{ base: "10px", md: "50px" }}
        pt={{ base: "30px", md: "50px" }}
        borderRadius={"20px"}
      >
        <Flex
          maxW={{ base: "100%", md: "max-content" }}
          w="100%"
          mx={{ base: "auto", lg: "0px" }}
          me="auto"
          justifyContent="center"
          px={{ base: "20px", md: "0px" }}
          flexDirection="column"
        >
          <Box me="auto">
            <Heading color={textColor} fontSize="36px" mb="10px">
              Sign In
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColorSecondary}
              fontWeight="400"
              fontSize="md"
            >
              Enter your email and password to sign in!
            </Text>
          </Box>
          <Flex
            zIndex="2"
            direction="column"
            w={{ base: "100%", md: "420px" }}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            mx={{ base: "auto", lg: "unset" }}
            me="auto"
            mb={{ base: "20px", md: "auto" }}
          ></Flex>
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="mail@simmmple.com"
              mb="24px"
              fontWeight="500"
              size="lg"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                ms={{ base: "0px", md: "4px" }}
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show?.password ? "text" : "password"}
                variant="auth"
                required
                pattern=".{8,}"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show?.password ? ViewOffIcon : ViewIcon}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Flex
              justifyContent="space-between"
              align="center"
              mb="24px"
            ></Flex>
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              // onClick={handleSignIn}
              isLoading={show.loader}
              type='submit'
            >
              Sign In
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Not registered yet?
              <NavLink to="/signup">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Create an Account
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </CustomCard>
      </form>
    </Flex>
  );
}

export default SignIn;
