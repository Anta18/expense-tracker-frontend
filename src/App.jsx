import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/userAuthentication/Login";
import Signup from "./components/userAuthentication/Signup";
import Home from "./components/Home";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box minH="100vh" w="100%" bg="black" align="center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
