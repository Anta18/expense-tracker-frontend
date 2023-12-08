import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/userAuthentication/Login";
import Signup from "./components/userAuthentication/Signup";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
