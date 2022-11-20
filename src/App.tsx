import React, { Component, useState } from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Heart from "./pages/Heart/index";
import JumpHeart from "./pages/JumpHeart";

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
  return (
    <Container>
      <Routes>
        <Route path="/comeOn" element={<Heart />} />
        <Route path="/jumpHeart" element={<JumpHeart />} />
      </Routes>
    </Container>
  );
}

export default App;
