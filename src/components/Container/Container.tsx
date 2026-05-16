import { useContext } from "react";
import "./Container.scss";
import { ThemeContext } from "../../context/ThemeContext";

type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`container ${theme === "dark" ? "container--dark" : ""}`}>
      {children}
    </div>
  );
}
