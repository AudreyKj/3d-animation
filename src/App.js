import React, { useState, useEffect } from "react";
import Playground from "./playground.js";
import PlaygroundMobile from "./playground-mobile.js";
import "./App.css";
import { Helmet } from "react-helmet";

function App() {
  const [state, setState] = useState({
    isLoaded: true
  });

  /* eslint-disable */
  useEffect(() => {
    setTimeout(() => {
      setState(state => {
        return {
          isLoaded: false
        };
      });
    }, 2000);
  }, []);

  return (
    <div className="App">
      <Helmet>
        <title>GRADIENT SKIN</title>
        <meta name="description" content="3d animation" />
        <meta name="keywords" content="3d animation" />
        <meta name="application-name" content="3d animation" />
        <meta name="theme-color" content="#a7b9c4" />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:title" content="3d animation" />
        <meta property="og:description" content="3d animation" />
        <meta property="og:image" content="preview.jpg" />
        <meta property="og:image:url" content="preview.jpg" />
      </Helmet>

      {state.isLoaded && <div className="loading"></div>}

      <div className="home" id="home">
        <Playground></Playground>
      </div>

      <div className="home-mobile" id="home-mobile">
        <PlaygroundMobile></PlaygroundMobile>
      </div>

      <header>
        made by <a
          href="https://www.instagram.com/audreykadjar/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @audreykadjar
        </a> <br />
        see project on&nbsp;
        <a
          href="https://github.com/AudreyKj/3d-animation"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </header>
    </div>
  );
}

export default App;
