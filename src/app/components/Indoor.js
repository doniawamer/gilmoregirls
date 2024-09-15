"use client";
import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import down from "../../assets/images/down.png";
import { device } from "@/theme/mediaQuery";

import data from "../../../scripts/data";
import dust from "../../assets/images/dust.png";
import Modal from "./Modal";

const BOOK_COVERS = {
  ROSE: 0,
  PURPLE: 1,
  NAVY: 2,
  GREEN: 3,
  BLUE: 4,
};

const IndoorWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  &:before {
    content: "";
    position: absolute;
    top: -244px;
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

  display: none;

  @media (${device.xl}) {
    display: block;
    left: -13%;
    top: 59%;
  }

  @media (${device.xxl}) {
    left: 3%;
    top: 45%;
  }
  @media (${device.xxxl}) {
    left: 10%;
  }
`;

const Books = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: flex-end;
  gap: 14px;
  width: 100%;
  height: 115px;
  padding: 0 12px;
  overflow-x: auto;
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 600px) {
    justify-content: center;
  }

  @media (${device.md}) {
    padding: 0 125px;
  }

  @media (${device.xxxl}) {
    padding: 0 215px;
    gap: 28px;
  }
`;

const BookStoreWrap = styled.div`
  filter: ${({ $isDark }) => ($isDark ? "brightness(0.9)" : "brightness(1)")};
  transition: filter 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  background: url("/images/bookstore.svg") no-repeat center center;
  background-size: cover;
  width: 100%;
  /* min-width: 1183px; */
  height: 786px;

  @media (${device.md}) {
    background-size: contain;
  }
  @media (${device.xl}) {
    position: absolute;
    left: 22%;
    top: 50%;
    transform: translate(0%, -50%);
  }
  @media (${device.xxl}) {
    left: 32%;
  }
`;

const DropdownWrap = styled.div`
  z-index: 9;
  display: flex;
  gap: 24px;
  margin: 32px 12px 0;
  flex-wrap: wrap;
  justify-content: center;
`;

const DropdownSeason = styled(Dropdown)`
  left: 16%;
  top: 46%;
  @media (${device.xl}) {
    left: 6%;
  }
  @media (${device.xxl}) {
    left: 19%;
  }
  @media (${device.xxxl}) {
    left: 23%;
  }
`;
const DropdownEpisode = styled(Dropdown)`
  z-index: 9 !important;

  left: 2%;
  top: 66%;
  @media (${device.xl}) {
    left: 3%;
  }
  @media (${device.xxxl}) {
    left: 10%;
    top: 62%;
  }
`;

const Dust = styled(Image)`
  height: 56px;
  width: auto;

  opacity: 0;
  animation: fadeIn 0.6ms ease-in forwards;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const Indoor = ({ isDark, ...props }) => {
  const [selectedSeason, setSelectedSeason] = useState();
  const [selectedEpisode, setSelectedEpisode] = useState();
  const [episodeData, setEpisodeData] = useState();
  const [bookData, setBookData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const onSeasonSelect = (data) => {
    setEpisodeData(data.episodes);
    setSelectedEpisode();
  };
  const onEpisodeSelect = (data) => {
    setBookData(data.books);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onBookClick = (book) => {
    setSelectedBook(book);
    handleOpenModal();
  };

  return (
    <>
      <IndoorWrap $isDark={isDark} {...props}>
        <Frame $isDark={isDark} />
        <DropdownWrap>
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
            errorText="Please select an Episode"
          />
        </DropdownWrap>

        <BookStoreWrap>
          <Books>
            {bookData?.map((book, i) => (
              <Book
                color={i % 5}
                book={book}
                key={`${i}-${book.name}`}
                onClick={() => onBookClick(book)}
              />
            ))}
            {bookData?.length === 0 && <Dust src={dust} alt="dust" />}
          </Books>
        </BookStoreWrap>
      </IndoorWrap>
      <Modal
        showModal={showModal}
        selectedBook={selectedBook}
        onClose={handleCloseModal}
      />
    </>
  );
};

const DropdownContainer = styled.div`
  display: inline-block;
  z-index: 10;
  transform: translate(0%, -50%);

  min-width: 200px;
  width: 100%;
  @media (${device.sm}) {
    width: 200px;
  }

  @media (${device.xl}) {
    position: absolute;
  }
`;

const DropdownButton = styled.button`
  background-color: #eee7e0;
  color: #333;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: ${({ $isOpen }) => ($isOpen ? "4px 4px 0 0" : "4px")};

  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: inherit;

  &:hover {
    filter: brightness(1.03);
    color: #333;
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
    opacity: 0;

    @media (${device.xl}) {
      opacity: 1;
    }
  }
`;

const DropdownItem = styled.div`
  color: #333;
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: ${($disabled) => ($disabled ? "" : "#f5f0eb")};
    background-color: #f5f0eb;
    filter: brightness(1.02);
  }
`;

const ArrowIcon = styled(Image)`
  margin-left: 10px;
  width: auto;
  height: 26px;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : " rotate(0)")};
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
`;

const DropdownContent = styled.div`
  display: block;
  position: absolute;
  background-color: #f5f0eb;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  z-index: 10;
  width: 100%;
  border-radius: 0px 0 4px 4px;
  max-height: ${({ $show }) => ($show ? "150px" : "0")};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  overflow-y: auto;
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
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

const BOOK_SVGS = {
  [BOOK_COVERS.ROSE]: "/images/book_rose.svg",
  [BOOK_COVERS.PURPLE]: "/images/book_purple.svg",
  [BOOK_COVERS.NAVY]: "/images/book_navy.svg",
  [BOOK_COVERS.GREEN]: "/images/book_green.svg",
  [BOOK_COVERS.BLUE]: "/images/book_blue.svg",
};

const TITLE_COLORS = {
  [BOOK_COVERS.ROSE]: "#C0856E",
  [BOOK_COVERS.PURPLE]: "#462546",
  [BOOK_COVERS.NAVY]: "#1A2E43",
  [BOOK_COVERS.GREEN]: "#384C34",
  [BOOK_COVERS.BLUE]: "#55788F",
};

const BookWrap = styled.div`
  width: 70.22px;
  height: 115.12px;
  background: url(${({ $backgroundImage }) => $backgroundImage}) no-repeat
    center center;
  background-size: contain;
  color: white;
  flex-shrink: 0;

  cursor: pointer;

  transition: transform 0.3s ease, filter 0.3s ease;

  &:hover {
    filter: brightness(1.02);
    transform: translateY(-2px) scale(1.02);
  }
`;

const BookTitle = styled.h2`
  max-height: 115.12px;
  color: ${({ $color }) => $color || "white"};
  margin: auto;
  font-size: 10px;
  padding: 10px 5px 0 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  @media (${device.md}) {
    font-size: 12px;
  }
`;

const Book = ({ color, book, ...props }) => {
  const svgPath = BOOK_SVGS[color];
  const titleColor = TITLE_COLORS[color];

  if (!book) {
    return null;
  }

  return (
    <BookWrap $backgroundImage={svgPath} {...props}>
      <BookTitle $color={titleColor}>{book?.name}</BookTitle>
    </BookWrap>
  );
};
