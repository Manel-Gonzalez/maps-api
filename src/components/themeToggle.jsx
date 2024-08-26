import {useEffect, useState} from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="">
      {theme === "light" ? (
        <img
          onClick={toggleTheme}
          className="w-8 h-8 cursor-pointer "
          src="dark.png"
        />
      ) : (
        <img
          onClick={toggleTheme}
          className="w-8 h-8 cursor-pointer"
          src="light.png"
        />
      )}
    </div>
  );
};

export default ThemeToggle;
