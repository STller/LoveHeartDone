import React, { PureComponent, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const Button = styled.button`
  border: 0;
  outline: 0;
  background-color: transparent;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const CountContainer = styled.div`
  position: absolute;
  overflow: visible;
  bottom: -300%;
  transform: translateX(-50%);
  height: 72px;
  overflow: hidden;
`;

const slide = keyframes`
  0% {
    // transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translateY(0);
  }
`;

const animate = (yNum: number) => keyframes`
  0% {
    // transform: translateY(0px);
  }
  100% {
    transform: translateY(${yNum}px);
  }
`;

type styledCommonType = {
  hearted?: boolean;
  red?: boolean;
};
const CountReel = styled.div<styledCommonType>`
  will-change: transform;
  ${(props) =>
    props.hearted &&
    css`
      animation: ${(props: styledCommonType) =>
          animate(props.hearted ? -80 : 0)}
        0.5s ease-in-out forwards;
    `};
`;

const Count = styled.span<styledCommonType>`
  display: block;
  font-size: 16px;
  color: #b2b2b2;
  padding-bottom: 8px;
  width: 80vw;
  height: 72px;
  line-height: 36px;
  color: ${(props) => (props.red ? "#f05053" : "#b2b2b2")};
`;

const heartbeat = keyframes`
  0% { 
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(2.0); 
  }
`;

const blowout = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
`;

const confetti = keyframes`
  0% {
    opacity: 1;
    transform: scale(1.8);
  }
  100% {
    transform: scale(2.0);
    opacity: 1;
  }
`;

const Container = styled.span`
  height: 16px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 6px 10px 4px 10px;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    width: 27px;
    height: 27px;
    margin-top: -1px;
    margin-left: -5px;
    border-radius: 100%;
    background: #d83535;
    display: inline-block;
    transform: scale(0);
    will-change: transform;
  }

  &:after {
    content: "";
    position: absolute;
    top: 11px;
    left: 16px;
    width: 2px;
    height: 2px;
    border-radius: 2px;
    box-shadow: 0 -18px 0 #d83535, 12px -12px 0 #d83535, 18px 0 0 #d83535,
      12px 12px 0 #d83535, 0 18px 0 #d83535, -12px 12px 0 #d83535,
      -18px 0 0 #d83535, -12px -12px 0 #d83535;
    transform: scale(0);
    will-change: transform;
  }

  svg {
    fill: #b2b2b2;
    will-change: transform;
  }

  ${(props: styledCommonType) =>
    props.hearted &&
    css`
      &:before {
        animation: ${blowout} 0.6s ease-in-out;
      }

      svg {
        opacity: 0;
        fill: red;
        animation: ${heartbeat} 0.4s ease-in-out forwards;
        animation-delay: 0.3s;
      }

      &:after {
        animation: ${confetti} 0.6s ease-in-out;
        animation-delay: 0.3s;
      }
    `};
`;

// interface propsType {
//   hearted: boolean;
//   onClick: () => void;
// }

const Heart = () => {
  const [state, setState] = useState(false);
  return (
    <Button onClick={() => setState((state) => !state)}>
      <Container hearted={state}>
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15">
          <path d="M12.4713 0C10.7596 0 9.2698.95 8.5 2.3512 7.73.95 6.2404 0 4.5287 0 2.0274 0 0 2.0277 0 4.5287c0 5.2882 8.5 9.824 8.5 9.824S17 9.817 17 4.529C17 2.0277 14.9726 0 12.4713 0z" />
        </svg>

        <CountContainer className="CountContainer">
          <CountReel className="CountReel" hearted={state}>
            <Count>???????????????????????????????????????????????????????????????(?????????)</Count>
            <Count red>?????????????????????????????????????????????????????????~~</Count>
          </CountReel>
        </CountContainer>
      </Container>
    </Button>
  );
};

export default Heart;
