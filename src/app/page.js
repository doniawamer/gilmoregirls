"use client";
import { useState } from "react";
import Head from "next/head";
import useTheme from "@/hooks/useTheme";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Toggle from "./components/Toggle";

import { Indoor } from "./components/Indoor";
import { Outdoor } from "./components/Outdoor";

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
    $isDark ? theme.palette.dark.background : theme.palette.light.background};
  color: ${({ theme, $isDark }) =>
    $isDark ? theme.palette.dark.text : theme.palette.light.text};
  transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  padding-bottom: 80px;
  position: relative;
`;

const StoreWrap = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

const FadeContainer = styled.div`
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transform: ${({ $isVisible }) => ($isVisible ? "scale(1)" : "scale(0.9)")};
  transition: opacity 0.6s ease, transform 0.6s ease;
  pointer-events: ${({ $isVisible }) => ($isVisible ? "all" : "none")};
  width: 100%;
  height: 100%;
  display: block;
`;

const OutdoorImage = styled(Outdoor)`
  cursor: pointer;
`;

export default function Home() {
  const [isDark, toggleTheme] = useTheme();
  const [showOutdoor, setShowOutdoor] = useState(true);
  const [showIndoor, setShowIndoor] = useState(false);
  const [isOutdoorInDOM, setIsOutdoorInDOM] = useState(true);

  const handleHideOutdoor = () => {
    setShowOutdoor(false);
    setTimeout(() => {
      setShowIndoor(true);
      setIsOutdoorInDOM(false);
    }, 600);
  };

  return (
    <ContainerWrap $isDark={isDark}>
      <Head>
        <title>Stars Hallow Books - {showIndoor ? "inside" : "outside"}</title>
      </Head>
      <Row className="p-4">
        <Col>
          <Toggle isDark={isDark} toggleTheme={toggleTheme} />
        </Col>
      </Row>
      <StoreWrap onClick={handleHideOutdoor}>
        {isOutdoorInDOM && (
          <FadeContainer $isVisible={showOutdoor}>
            <OutdoorImage isDark={isDark} />
          </FadeContainer>
        )}

        <FadeContainer $isVisible={showIndoor}>
          <Indoor isDark={isDark} />
        </FadeContainer>
      </StoreWrap>
      <div id="modal-root" />
    </ContainerWrap>
  );
}
