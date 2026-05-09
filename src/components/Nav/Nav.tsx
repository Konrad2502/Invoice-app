import "./Nav.scss";
import navLogo from "../../assets/logo.svg";
import avatar from "../../assets/image-avatar.jpg";
import darkTheme from "../../assets/icon-moon.svg";
import lightTheme from "../../assets/icon-sun.svg";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Nav() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="nav">
      <div className="nav__logo">
        <img className="nav__logo-img" src={navLogo} alt="navlogo" />
      </div>
      <div className="nav__items">
        <button className="nav__button" type="button" onClick={toggleTheme}>
          {theme === "dark" ? (
            <img
              src={lightTheme}
              alt="lighttheme"
              className="nav__button-img"
            />
          ) : (
            <img className="nav__button-img" src={darkTheme} alt="darktheme" />
          )}
        </button>
        <div className="nav__avatar">
          <img className="nav__avatar-img" src={avatar} alt="avatar" />
        </div>
      </div>
    </div>
  );
}
