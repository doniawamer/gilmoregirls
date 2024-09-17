"use client";
import { useState, useEffect } from "react";
import useTheme from "@/hooks/useTheme";
import { Poppins, Sacramento } from "@next/font/google";

import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Toggle from "./components/Toggle";

import { Indoor } from "./components/Indoor";
import { Outdoor } from "./components/Outdoor";
import { device } from "@/theme/mediaQuery";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: ["400"],
});

const MIN_WIDTH_THRESHOLD = 320;
const MIN_HEIGHT_THRESHOLD = 480;

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

const SlantedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 550px;

  background-color: ${({ $isDark }) => ($isDark ? "#F3BEB3" : "#F4927F")};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.8s ease;

  /* Create the slant using clip-path */
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 77%);

  z-index: 0;

  @media (${device.md}) {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 78%);
  }
  @media (${device.xl}) {
    height: 400px;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 53%);
  }
  @media (${device.xxxl}) {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 48%);
  }
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

const WarningMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 12px;
  padding: 0 12px;
  text-align: center;
  color: ${({ theme, $isDark }) =>
    $isDark ? theme.palette.dark.text : theme.palette.light.text};

  @media (${device.md}) {
    font-size: 24px;
  }
  & p {
    max-width: 600px;
  }
`;

const MadeWithLove = styled.div`
  position: fixed;
  bottom: 5px;
  right: 5px;
  font-size: 14px;
  /* font-family: ${sacramento.style.fontFamily}; */
  font-weight: 400;
  color: ${({ theme, $isDark }) =>
    $isDark ? theme.palette.dark.link : theme.palette.light.link};
  opacity: 80%;
  a {
    color: inherit;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      color: ${({ theme, $isDark }) =>
        $isDark ? theme.palette.dark.hover : theme.palette.light.hover};
    }
  }
`;

export default function Home() {
  const [isDark, toggleTheme] = useTheme();
  const [showOutdoor, setShowOutdoor] = useState(true);
  const [showIndoor, setShowIndoor] = useState(false);
  const [isOutdoorInDOM, setIsOutdoorInDOM] = useState(true);
  const [isScreenTooSmall, setIsScreenTooSmall] = useState(false);

  const handleHideOutdoor = () => {
    setShowOutdoor(false);
    setTimeout(() => {
      setShowIndoor(true);
      setIsOutdoorInDOM(false);
    }, 600);
  };
  useEffect(() => {
    const checkScreenSize = () => {
      if (
        window.innerWidth < MIN_WIDTH_THRESHOLD ||
        window.innerHeight < MIN_HEIGHT_THRESHOLD
      ) {
        setIsScreenTooSmall(true);
      } else {
        setIsScreenTooSmall(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <ContainerWrap $isDark={isDark} className={poppins.className}>
      <Row className="p-4">
        <Col>
          <Toggle isDark={isDark} toggleTheme={toggleTheme} />
        </Col>
      </Row>
      {isScreenTooSmall && (
        <WarningMessage $isDark={isDark}>
          <p>
            Looks like the Stars Hollow bookstore needs more space — expand your
            window to step inside!
          </p>
        </WarningMessage>
      )}
      {!isScreenTooSmall && (
        <StoreWrap onClick={handleHideOutdoor}>
          {isOutdoorInDOM && (
            <FadeContainer $isVisible={showOutdoor}>
              <OutdoorImage isDark={isDark} />
            </FadeContainer>
          )}

          <SlantedBackground $isVisible={showIndoor} $isDark={isDark} />

          <FadeContainer $isVisible={showIndoor}>
            <Indoor isDark={isDark} />
          </FadeContainer>
        </StoreWrap>
      )}
      <div id="modal-root" />
      <MadeWithLove $isDark={isDark}>
        <a href="https://doniawamer.com" target="_blank">
          Made with love ♥
        </a>
      </MadeWithLove>
    </ContainerWrap>
  );
}
