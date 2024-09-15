"use client";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import { device } from "@/theme/mediaQuery";

import houseDark from "../../assets/images/houseDark.svg";
import houseLight from "../../assets/images/houseLight.svg";

const RowWrap = styled(Row)`
  width: 100%;
  height: 80vh;
  margin: 0 auto;
  position: relative;

  @media (${device.sm}) {
    max-width: 97vw;
  }

  @media (${device.xl}) {
    max-width: 80vw;
  }
`;

const ImageWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  opacity: ${({ $hide }) => ($hide ? 0 : 1)};
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

const StoreImg = styled(Image)`
  filter: ${({ $isDark }) => ($isDark ? "brightness(0.9)" : "brightness(1)")};
  transition: filter 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  height: 80%;
  object-fit: cover;
  z-index: 0;
  @media (${device.sm}) {
    height: 100%;
    object-fit: contain;
  }
`;

export const Outdoor = ({ isDark, ...props }) => {
  return (
    <RowWrap {...props}>
      <Col className="px-5 mb-5">
        <ImageWrap $hide={isDark}>
          <StoreImg src={houseLight} alt="Stars Hollow Books" priority />
        </ImageWrap>
        <ImageWrap $hide={!isDark}>
          <StoreImg src={houseDark} alt="Stars Hollow Books" />
        </ImageWrap>
      </Col>
    </RowWrap>
  );
};
