"use client";
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";

const Title = styled.h1`
  color: red;
`;

export default function NotFound() {
  return (
    <div>
      <Title>oops</Title>
    </div>
  );
}
