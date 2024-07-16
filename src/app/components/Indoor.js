"use client";
import styled from "styled-components";
import Image from "next/image";
import bookstore from "../../assets/images/bookstore.svg";

import data from "../../../scripts/data";

const IndoorWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  &:before {
    content: "";
    position: absolute;
    top: -210px;
    left: 50%;
    transform: translateX(-50%);
    width: 138px;
    height: 276px;
    background: url("/images/lamp.svg") no-repeat center center;
    background-size: contain;
    z-index: 3;
    filter: ${({ $isDark }) => ($isDark ? "brightness(0.9)" : "brightness(1)")};
    transition: filter 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const Frame = styled.div`
  position: absolute;
  width: 200px;
  height: 300px;
  background: url("/images/frame.svg");
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 2;
  filter: ${({ $isDark }) => ($isDark ? "brightness(0.9)" : "brightness(1)")};
  transition: filter 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  left: 10%;
  top: 50%;
  transform: translate(0%, -50%);
`;

const BookStore = styled(Image)`
  filter: ${({ $isDark }) => ($isDark ? "brightness(0.9)" : "brightness(1)")};
  transition: filter 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  width: auto;
  height: 100%;
  object-fit: contain;
  z-index: 0;

  position: absolute;
  left: 35%;
  top: 50%;
  transform: translate(0%, -50%);
`;

export const Indoor = ({ isDark }) => {
  console.log("data", data);
  return (
    <IndoorWrap $isDark={isDark}>
      <Frame $isDark={isDark} />
      <BookStore src={bookstore} $isDark={isDark} alt="Stars Hollow Books" />
    </IndoorWrap>
  );
};
