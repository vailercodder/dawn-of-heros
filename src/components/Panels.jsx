import React from "react";

const Panels = () => {
  return (
    <div className="panels-container">
      <div className="panel left-panel">
        <div className="content">
          <h3>New here?</h3>
          <p>Join THE legends of future!</p>
          <button className="btn transparent" id="sign-up-btn">
            Sign Up
          </button>
        </div>
        <img src="./img/log.svg" className="image" alt="" />
      </div>
      <div className="panel right-panel">
        <div className="content">
          <h3>One of us?</h3>
          <p>Get back into the fight!</p>
          <button className="btn transparent" id="sign-in-btn">
            Sign In
          </button>
        </div>
        <img src="./img/register.svg" className="image" alt="" />
      </div>
    </div>
  );
};

export default Panels;
