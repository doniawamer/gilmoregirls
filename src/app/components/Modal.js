import ReactDOM from "react-dom";
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { device } from "@/theme/mediaQuery";

const CHARACTER = [
  "Lorelai Gilmore",
  "Rory Gilmore",
  "Emily Gilmore",
  "Richard Gilmore",
  "Luke Danes",
  "Sookie St. James",
  "Lane Kim",
  "Paris Geller",
  "Jess Mariano",
  "Dean Forester",
  "Logan Huntzberger",
  "Michel Gerard",
  "Kirk Gleason",
  "Christopher Hayden",
  "Miss Patty",
  "Babette Dell",
  "Jackson Belleville",
  "Taylor Doose",
  "Gypsy",
  "April Nardini",
  "Zach Van Gerbig",
  "Brian Fuller",
  "Mitchum Huntzberger",
  "Sherry Tinsdale",
  "Madeline Lynn",
  "Louise Grant",
  "Doyle McMaster",
  "Marty",
  "Tristan Dugray",
  "Francie Jarvis",
  "Trix Gilmore",
  "Jason Stiles",
  "Lucy",
  "Olivia",
  "Anna Nardini",
  "Mia Bass",
  "Liz Danes",
  "TJ",
  "Trix Gilmore",
  "Jamie",
  "Gigi Hayden",
  "Colin McCrae",
  "Finn",
  "Honor Huntzberger",
  "Asher Fleming",
  "Paul Anka",
  "The Troubadour",
  "Digger",
  "Robert Grimaldi",
];

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ModalWrap = styled.div`
  position: fixed;
  width: 320px;
  height: 488.97px;
  top: calc(50% - 164px);
  left: calc(50% - 160px);
  background: url("/images/modal.svg") no-repeat center center;
  background-size: contain;
  padding: 20px;
  animation: ${slideUp} 0.5s ease forwards;
  z-index: 7;
  max-width: 100vw;
  max-height: 100vh;

  @media (${device.md}) {
    width: 430.16px;
    height: 657.29px;
    top: calc(50% - 328px);
    left: calc(50% - 215px);
  }

  h2 {
    color: #333;
    font-size: 10px;
    padding-right: 25px;
    margin-top: 27px;
    padding-left: 59px;
    @media (${device.md}) {
      font-size: 12px;
      margin-top: 45px;
      padding-left: 80px;
    }
  }

  > p {
    font-size: 10px;
    display: flex;
    align-items: center;

    color: #333;
    min-height: 30px;
    padding-right: 25px;
    margin-top: 12px;
    padding-left: 59px;

    @media (${device.md}) {
      font-size: 12px;
      margin-top: 21px;
      padding-left: 80px;
    }
  }
`;

const Checkout = styled.div`
  margin-top: 64px;
  padding: 0 20px;

  @media (${device.md}) {
    margin-top: 88px;
    padding: 0 40px;
  }

  p {
    font-size: 10px;
    color: #333;
    display: flex;
    column-gap: 35px;
    margin-bottom: 10px;
    @media (${device.md}) {
      margin-bottom: 20px;
      font-size: 12px;
      column-gap: 85px;
    }
  }

  .date {
    color: #9a465d;
    font-weight: 600;
    width: 60px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 6;
`;

const getRandomDate = (start, end) => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date;
};

const formatDate = (date) => {
  const options = { month: "short", year: "2-digit" };
  const dateParts = date.toLocaleDateString("en-US", options).split(" ");
  return `${dateParts[0]} '${dateParts[1]}`;
};

const getRandomCharacters = (array, max = 3) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  const selectedCharacters = shuffled.slice(0, max);

  const charactersWithDates = selectedCharacters.map((character) => {
    const randomDate = getRandomDate(new Date(2000, 0, 1), new Date());
    return { name: character, date: formatDate(randomDate) };
  });

  return charactersWithDates.sort(
    (a, b) => new Date("01 " + a.date) - new Date("01 " + b.date)
  );
};

const Modal = ({ showModal, selectedBook, onClose }) => {
  const checkout = getRandomCharacters(CHARACTER);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.id === "overlay") {
        onClose();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  if (!showModal) return null;

  return ReactDOM.createPortal(
    <>
      <Overlay id="overlay" />
      <ModalWrap>
        <h2>{selectedBook?.author}</h2>
        <p>{selectedBook?.name}</p>
        <div>
          <Checkout>
            {checkout?.map((char, i) => (
              <p key={`${i}-${char.name}`}>
                <span className="date">{char.date}</span>
                <span>{char.name}</span>
              </p>
            ))}
          </Checkout>
        </div>
      </ModalWrap>
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
