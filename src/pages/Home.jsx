import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>WELCOME AGENT</h1>
            <p>Scroll down to discover where you are.</p>
          </div>
          <div className="dot left"></div>
          <div className="dot right"></div>
          <div className="rectangle left"></div>
          <div className="rectangle right"></div>
        </section>

        <section className="explanation">
          <div className="explanation-content">
            <div className="explanation-words slide-in">
              <h2>
                <span className="highlight">what to expect</span>
              </h2>
              <p>
                <span className="highlight">WELCOME</span> to the superhero
                agency
              </p>
              <p>
                On this site you will be able to create and shape your very own
                <span className="highlight">collection of heroes</span>
              </p>
              <p>
                Each hero has his own powers and
                <span className="highlight">UNIQUE</span> abilities
              </p>
              <p>
                <span className="highlight">YOU</span> will be able to form your
                very
                <span className="highlight">OWN SUPERHERO team</span>
              </p>
              <p>
                <span className="highlight">Mister INCREDIBLE</span> will guide
                you along the way
              </p>
              <p>
                <span className="highlight">GOOD LUCK!</span>
              </p>
            </div>
            <img
              src="./img/pngegg (1).png"
              alt="Superhero"
              className="slide-in-image"
            />
          </div>
        </section>

        <section className="grid">
          <div className="wrapper">
            <a href="#" className="news-item hero-item"></a>
            <a href="#" className="news-item standard-item"></a>
            <a href="#" className="news-item standard-item"></a>
            <a href="#" className="news-item standard-item"></a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
