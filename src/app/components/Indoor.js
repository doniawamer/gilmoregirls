"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import bookstore from "../../assets/images/bookstore.svg";
import down from "../../assets/images/down.png";
import { device } from "@/theme/mediaQuery";

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

  left: -6%;
  top: 50%;
  transform: translate(0%, -50%);

  @media (${device.xxl}) {
    left: 3%;
  }
  @media (${device.xxxl}) {
    left: 10%;
  }
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

const DropdownSeason = styled(Dropdown)`
  /* left: 5%;
  top: 50%; */
  left: 16%;
  top: 46%;
  @media (${device.xxl}) {
    left: 20%;
  }
  @media (${device.xxxl}) {
    left: 23%;
  }

  &:before {
    content: "";
    position: absolute;
    top: -95px;
    left: 50%;
    transform: translateX(-50%);
    width: 240px;
    height: 100px;
    background: url("/images/dropdown_frame.svg") no-repeat center center;
    background-size: contain;
    z-index: 1;
    user-select: none;
  }
`;
const DropdownEpisode = styled(Dropdown)`
  left: 10%;
  top: 65%;
  &:before {
    content: "";
    position: absolute;
    top: -95px;
    left: 50%;
    transform: translateX(-50%);
    width: 240px;
    height: 100px;
    background: url("/images/dropdown_frame.svg") no-repeat center center;
    background-size: contain;
    z-index: 1;
    user-select: none;
  }
`;

export const Indoor = ({ isDark, ...props }) => {
  const [selectedSeason, setSelectedSeason] = useState();
  const [selectedEpisode, setSelectedEpisode] = useState();
  const [episodeData, setEpisodeData] = useState();
  const [bookData, setBookData] = useState();

  const onSeasonSelect = (data) => {
    setEpisodeData(data.episodes);
  };
  const onEpisodeSelect = (data) => {
    setBookData(data.books);
  };

  useEffect(() => {
    console.log("bookData", bookData);
  }, [bookData]);

  return (
    <IndoorWrap $isDark={isDark} {...props}>
      <Frame $isDark={isDark} />
      <DropdownSeason
        options={data}
        selected={selectedSeason}
        setSelected={setSelectedSeason}
        onSelect={onSeasonSelect}
        selectText="Select Season"
        selectField="season"
        errorText="Please try again later"
      />
      <DropdownEpisode
        options={episodeData}
        selected={selectedEpisode}
        setSelected={setSelectedEpisode}
        onSelect={onEpisodeSelect}
        selectText="Select Episode"
        selectField="name"
        errorText="Please select a Season"
      />

      <BookStore src={bookstore} $isDark={isDark} alt="Stars Hollow Books" />
    </IndoorWrap>
  );
};

const DropdownContainer = styled.div`
  position: absolute;
  display: inline-block;
  z-index: 2;
  transform: translate(0%, -50%);
`;

const DropdownButton = styled.button`
  background-color: #eee7e0;
  color: #333;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: ${({ $isOpen }) => ($isOpen ? "4px 4px 0 0" : "4px")};

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;

  &:hover {
    filter: brightness(1.03);
    color: #333;
  }
`;

const DropdownContent = styled.div`
  display: ${({ $show }) => ($show ? "block" : "none")};
  position: absolute;
  background-color: #f5f0eb;
  z-index: 1;
  width: 100%;
  border-radius: 0px 0 4px 4px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 2;
`;

const DropdownItem = styled.div`
  color: #333;
  padding: 8px 16px;
  cursor: ${($disabled) => ($disabled ? "" : "pointer")};
  &:hover {
    background-color: ${($disabled) => ($disabled ? "" : "#f5f0eb")};
    filter: ${($disabled) => ($disabled ? "" : "brightness(1.05)")};
  }
`;

const ArrowIcon = styled(Image)`
  margin-left: 10px;
  width: auto;
  height: 26px;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : " rotate(0)")};
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
`;

function Dropdown({
  options,
  selected,
  setSelected,
  onSelect,
  selectText,
  selectField,
  errorText,
  ...rest
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelection = (option) => {
    setSelected(option);
    setShowDropdown(false);
    onSelect(option);
  };

  const selectedTitle = selected ? selected[selectField] : selectText;

  return (
    <DropdownContainer {...rest}>
      <DropdownButton
        $isOpen={showDropdown}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {selectedTitle}
        <ArrowIcon
          src={down}
          $isOpen={showDropdown}
          alt="arrow"
          aria-hidden="true"
        />
      </DropdownButton>
      <DropdownContent $show={showDropdown}>
        {options?.map((option, index) => (
          <DropdownItem key={index} onClick={() => handleSelection(option)}>
            {option[selectField]}
          </DropdownItem>
        ))}
        {!options && <DropdownItem $disabled>{errorText}</DropdownItem>}
      </DropdownContent>
    </DropdownContainer>
  );
}
