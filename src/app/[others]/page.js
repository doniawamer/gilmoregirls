"use client";
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Toggle from "../components/Toggle";
import useTheme from "@/hooks/useTheme";
import { device } from "@/theme/mediaQuery";

const Title = styled.h1`
  color: ${({ theme, $isDark }) =>
    $isDark ? theme.palette["dark"].text : theme.palette["light"].text};
  transition: color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  margin: auto auto;
  max-width: 300px;
  padding: 0 24px;
  @media (${device.md}) {
    max-width: 350px;
  }
`;

const ContainerWrap = styled(Container)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  max-width: none;
  overflow: hidden;
  background-color: ${({ theme, $isDark }) =>
    $isDark
      ? theme.palette["light"].toggleBackground
      : theme.palette["dark"].toggleBackground};
  transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  padding-bottom: 80px;
`;

export default function NotFound() {
  const [isDark, toggleTheme] = useTheme();
  return (
    <ContainerWrap $isDark={isDark}>
      <Row className="p-4">
        <Col>
          <Toggle checked={isDark} setChecked={toggleTheme} />
        </Col>
      </Row>
      <Title $isDark={isDark}>
        Why did you drop out of <strong>Yale</strong>?
      </Title>
    </ContainerWrap>
  );
}
