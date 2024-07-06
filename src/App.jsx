import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpLoginPage from "./pages/SignUpLoginPage";
import Home from "./pages/Home"; // Adjusted to Home component
import HeroGallery from "./pages/HeroGallery"; // Import HeroGallery page
import MyCollection from "./pages/MyCollection"; // Import MyCollection page
import Battle from "./pages/Battle"; // Import Battle page
import BattleVs from "./pages/BattleVs"; // Import BattleVs page
import HeroStats from "./pages/HeroStats"; // Import HeroStats page
import { useAuth } from "./services/AuthProvider"; // Adjust the path if necessary
import "./App.css";

const App = () => {
  const { currentUser } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={currentUser ? <Home /> : <SignUpLoginPage />}
        />
        <Route
          path="/home"
          element={currentUser ? <Home /> : <SignUpLoginPage />}
        />
        <Route path="/login" element={<SignUpLoginPage />} />
        <Route
          path="/hero-gallery"
          element={currentUser ? <HeroGallery /> : <SignUpLoginPage />}
        />
        <Route
          path="/my-collection"
          element={currentUser ? <MyCollection /> : <SignUpLoginPage />}
        />
        <Route
          path="/battle"
          element={currentUser ? <Battle /> : <SignUpLoginPage />}
        />
        <Route
          path="/battle/vs/:teamId"
          element={currentUser ? <BattleVs /> : <SignUpLoginPage />}
        />
        <Route
          path="/hero-stats/:id"
          element={currentUser ? <HeroStats /> : <SignUpLoginPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
