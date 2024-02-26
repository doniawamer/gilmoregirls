"use client";
import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Toggle from "./components/Toggle";
import houseDark from "../assets/images/houseDark.svg";
import houseLight from "../assets/images/houseLight.svg";

import data from "../../scripts/data";
import { Button } from "react-bootstrap";

const ContainerWrap = styled(Container)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  max-width: none;
  overflow: hidden;
  background-color: ${({ theme, $isDark }) =>
    $isDark
      ? theme.palette["light"].toggleBackground
      : theme.palette["dark"].toggleBackground};
  color: ${({ theme }) => theme.palette["dark"].text};
  transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  padding-bottom: 80px;
`;

const RowWrap = styled(Row)`
  max-width: 80vw;
  width: 100%;
  height: 80vh;
  margin: 0 auto;
  position: relative; /* Create a stacking context */
`;

const ImageWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ $hide }) => ($hide ? 0 : 1)};
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  return (
    <ContainerWrap $isDark={isDark}>
      <Row className="p-4">
        <Col>
          <Toggle checked={isDark} setChecked={setIsDark} />
        </Col>
      </Row>
      <RowWrap>
        <Col className="px-5 mb-5">
          <Outdoor isDark={isDark} />
        </Col>
      </RowWrap>
    </ContainerWrap>
  );
}

const Outdoor = ({ isDark }) => {
  return (
    <>
      <ImageWrap $hide={isDark}>
        <Image
          src={houseLight}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          alt="Stars Hollow Books"
        />
      </ImageWrap>
      <ImageWrap $hide={!isDark}>
        <Image
          src={houseDark}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          alt="Stars Hollow Books"
        />
      </ImageWrap>
    </>
  );
};
