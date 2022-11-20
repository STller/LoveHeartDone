import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ListContainer = styled.div`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
.list{
    margin-top: 10px;
    &:first-child {
        margin-top: 0px;
    }
}
`;

export default function List() {
  const navigate = useNavigate();
  const [list, setList] = useState([
    { path: "/app/comeOn", label: "加油打气" },
    { path: "/app/jumpHeart", label: "跳动的心❤" },
  ]);


  function handleNavigate(path: string) {
    navigate(path)
  }
  return (
    <ListContainer className="ListContainer" style={{display: 'flex',flexDirection: 'column',justifyContent: 'center'}}>
      {list.map((i, index) => (
        <span className="list" onClick={() => handleNavigate(i.path)} key={i.label}>{`${
          index + 1
        }、  ${i.label}`}</span>
      ))}
    </ListContainer>
  );
}
