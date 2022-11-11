import React, { Component, useState } from "react";
import ReactDOM from "react-dom/client";
import styled, { createGlobalStyle } from "styled-components";
import Heart from "./Heart/index";

createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }
  p {
    margin: 0;
    padding: 0;
  }
`;

const Container = styled.div`
  background-color: #000;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [state, setState] = useState(false);

  const handleOnHeart = () => {
    setState((state) => !state);
  };
  return (
    <Container>
      <Heart hearted={state} onClick={handleOnHeart} />
    </Container>
  );
}

export default App;
