import { useState, useEffect } from "react";

const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme =
      typeof window !== "undefined" ? localStorage.getItem("theme") : "light";
    return savedTheme === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prevTheme) => !prevTheme);
  };

  return [isDark, toggleTheme];
};

export default useTheme;
