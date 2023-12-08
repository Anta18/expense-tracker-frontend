import React from "react";
import { Text, Input, Box, Flex, Button, HStack, Link } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const backendUrl = "https://expense-tracker-backend-zb4y.onrender.com";

const Signup = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const handlesignup = async () => {
    setIsCreating(true);
    try {
      const response = await axios.post(`${backendUrl}/users/`, {
        email,
        password,
        name,
      });

      console.log("Signup successful:", response.data);
      await localStorage.setItem("token", response.data.token);
      console.log(response.data.token);
      const token = localStorage.getItem("token");
      setIsCreating(false);
      if (token) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Signup failed");
      setError("Signup failed");
      setIsCreating(false);
    }
  };
  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
      width="100vw"
      bg={"black"}
    >
      <Box>
        <Text
          marginY={8}
          fontWeight="bold"
          textAlign="center"
          fontSize="xl"
          color="white"
        >
          SIGNUP
        </Text>
        <Text mb={3} color="white">
          Name:
        </Text>
        <Input
          mb={5}
          width={500}
          borderRadius={20}
          placeholder="Name"
          variant="filled"
          color="#AB9696"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Text mb={3} color="white">
          Email:
        </Text>
        <Input
          mb={5}
          width={500}
          borderRadius={20}
          placeholder="Email"
          variant="filled"
          color="#AB9696"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <Text mb={3} color="white">
          Password:
        </Text>
        <Input
          width={500}
          borderRadius={20}
          placeholder="Password"
          variant="filled"
          type="password"
          color="#AB9696"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <HStack justify="center">
          <Button
            mt={8}
            mb={4}
            onClick={handlesignup}
            isLoading={isCreating}
            loadingText="Creating..."
            isDisabled={!email || !password}
            bg="#560909"
            color="white"
          >
            Signup
          </Button>
        </HStack>
        {error && <Text color="red.500">{error}</Text>}
        {
          <Link color="blue.300" as={RouterLink} to="/">
            Already have an account? Login now
          </Link>
        }
      </Box>
    </Flex>
  );
};

export default Signup;
