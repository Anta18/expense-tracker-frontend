import React from "react";
import { Text, Input, Box, Flex, Button, HStack, Link } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const backendUrl = "https://expense-tracker-backend-zb4y.onrender.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);
  const handlelogin = async () => {
    setIsCreating(true);
    try {
      const response = await axios.post(`${backendUrl}/users/login`, {
        email,
        password,
      });

      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);
      const token = localStorage.getItem("token");
      console.log(token);
      setIsCreating(false);
      if (response.data.token) {
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      setError(error);
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
          LOGIN
        </Text>
        <Text mb={3} color="white">
          Email:
        </Text>
        <Input
          mb={5}
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
            onClick={handlelogin}
            isLoading={isCreating}
            bg="#560909"
            loadingText="Logging in..."
            isDisabled={!email || !password}
            color="white"
          >
            Login
          </Button>
        </HStack>
        {error && <Text color="red.500">{error}</Text>}
        {
          <Link color="blue.300" as={RouterLink} to="/signup">
            Don't have an account? Signup now
          </Link>
        }
      </Box>
    </Flex>
  );
};

export default Login;
