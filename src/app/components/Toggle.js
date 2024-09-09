import styled from "styled-components";

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  cursor: pointer;
`;

const Switch = styled.div`
  position: relative;
  width: 56px;
  height: 30px;
  border-radius: 16px;
  border: 2px solid
    ${({ theme, $isDark }) =>
      $isDark
        ? theme.palette.dark.toggleBorder
        : theme.palette.light.toggleBorder};
  background: ${({ theme, $isDark }) =>
    $isDark ? theme.palette.dark.toggleBackground : `url(/images/stars.svg)`};

  background-size: auto;
  background-repeat: repeat;
  background-position: center;
  transition: background 350ms ease-in-out, border-color 350ms ease-in-out;
  z-index: 5;

  &:before {
    content: "";
    position: absolute;
    width: 26px;
    height: 26px;
    border-radius: 10px;
    top: 0;
    left: -4px;
    background-image: ${({ $isDark }) =>
      $isDark ? "url(/images/sun.svg)" : `url(/images/moon.svg)`};
    background-size: 24px;
    background-repeat: no-repeat;
    background-position: center;
    transition: transform 350ms ease-in-out, background-image 350ms ease-in-out;
  }

  &:hover {
    &:before {
      filter: brightness(1.1);
    }
  }
`;

const Input = styled.input`
  display: none;

  &:checked + ${Switch} {
    &:before {
      transform: ${({ $isDark }) => $isDark && "translate(28px, 0)"};
    }
  }
`;

const Toggle = ({ isDark, toggleTheme }) => {
  const handleChange = () => {
    toggleTheme();
  };

  return (
    <Label>
      <Input
        checked={isDark}
        $isDark={isDark}
        type="checkbox"
        onChange={handleChange}
      />
      <Switch $isDark={isDark} />
    </Label>
  );
};

export default Toggle;
