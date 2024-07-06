import React, { useState } from "react";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import { useAuth } from "../services/AuthProvider";
import "../styles/SignUpLoginPage.css";
import Panels from "../components/Panels";

const SignUpLoginPage = () => {
  const [signUpMode, setSignUpMode] = useState(false);
  const { currentUser } = useAuth();

  const handleSignUpClick = () => {
    setSignUpMode(true);
  };

  const handleSignInClick = () => {
    setSignUpMode(false);
  };

  return (
    <div className={`container ${signUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <SignInForm />
          <SignUpForm />
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Join THE legends of future!</p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          </div>
          <img src="./img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Get back into the fight!</p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
          </div>
          <img src="./img/register.svg" className="image" alt="" />
        </div>
      </div>
      <audio id="background-music" autoPlay loop>
        <source src="/sounds/01 The Glory Days.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button id="play-btn">Play</button>
      <button id="pause-btn">Pause</button>
      <input
        id="volume-slider"
        type="range"
        min="0"
        max="1"
        step="0.1"
        defaultValue="1"
      />
    </div>
  );
};

export default SignUpLoginPage;
