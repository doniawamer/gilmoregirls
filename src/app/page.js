"use client";
import useTheme from "@/hooks/useTheme";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Toggle from "./components/Toggle";

import { Indoor } from "./components/Indoor";
import { Outdoor } from "./components/Outdoor";
import data from "../../scripts/data";

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

export default function Home() {
  const [isDark, toggleTheme] = useTheme();
  console.log(">isDark", isDark);

  return (
    <ContainerWrap $isDark={isDark}>
      <Row className="p-4">
        <Col>
          <Toggle isDark={isDark} toggleTheme={toggleTheme} />
        </Col>
      </Row>
      {/* <Outdoor isDark={isDark} /> */}
      <Indoor isDark={isDark} />
    </ContainerWrap>
  );
}