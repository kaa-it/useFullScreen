import "./styles.css";
import image from "./pyrite.jpg";
import { useRef, useEffect, useState } from "react";

function isFullScreenElement(el) {
  const d = document;
  if (el) {
    return Boolean(
      d.fullscreenElement === el ||
        d.mozFullScreenElement === el ||
        d.webkitFullscreenElement === el ||
        d.msFullscreenElement === el
    );
  }

  return Boolean(
    d.fullscreenElement ||
      d.mozFullScreenElement ||
      d.webkitFullscreenElement ||
      d.msFullscreenElement ||
      d.fullscreen ||
      d.mozFullScreen ||
      d.webkitIsFullScreen ||
      d.fullScreenMode
  );
}

const useFullScreen = () => {
  const ref = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const openFullScreen = () => {
    const el = ref.current || document.documentElement;
    const requestFullscreen =
      el.webkitRequestFullScreen ||
      el.requestFullscreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen;

    return requestFullscreen.call(el);
  };

  const closeFullScreen = () => {
    const exitFullScreen =
      document.webkitExitFullscreen ||
      document.exitFullscreen ||
      document.mozCancelFullScreen ||
      document.msExitFullscreen;

    return exitFullScreen.call(document);
  };

  const toggleFullScreen = isFullScreen ? closeFullScreen : openFullScreen;

  useEffect(() => {
    setIsFullScreen(isFullScreenElement(ref.current));

    const handleChange = () => {
      setIsFullScreen(isFullScreenElement(ref.current));
    };

    document.addEventListener("webkitfullscreenchange", handleChange, false);
    document.addEventListener("mozfullscreenchange", handleChange, false);
    document.addEventListener("msfullscreenchange", handleChange, false);
    document.addEventListener("MSFullscreenChange", handleChange, false);
    document.addEventListener("fullscreenchange", handleChange, false);

    return () => {
      document.removeEventListener("webkitfullscreenchange", handleChange);
      document.removeEventListener("mozfullscreenchange", handleChange);
      document.removeEventListener("msfullscreenchange", handleChange);
      document.removeEventListener("MSFullscreenChange", handleChange);
      document.removeEventListener("fullscreenchange", handleChange);
    };
  }, []);

  return {
    ref,
    toggleFullScreen,
    openFullScreen,
    closeFullScreen,
    isFullScreen
  };
};

export default function App() {
  const { ref, toggleFullScreen, isFullScreen } = useFullScreen();

  return (
    <div className="App">
      <button onClick={toggleFullScreen}>
        {isFullScreen
          ? "Выйти из полноэкранного режима"
          : "Посмотреть во весь экран"}
      </button>
      <img src={image} alt="кристалл" ref={ref}/>
    </div>
  );
}
