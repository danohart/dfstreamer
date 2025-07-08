import { useEffect, useRef } from "react";

const Logo = ({ className = "" }) => {
  const distanceRef = useRef(null);
  const festRef = useRef(null);

  useEffect(() => {
    // Split each word into individual letters for animation
    const splitTextIntoLetters = (element) => {
      if (!element) return;
      const text = element.textContent;
      element.innerHTML = "";

      for (let i = 0; i < text.length; i++) {
        const letter = document.createElement("span");
        letter.className = "letter";
        letter.textContent = text[i];
        element.appendChild(letter);
      }
    };

    splitTextIntoLetters(distanceRef.current);
    splitTextIntoLetters(festRef.current);
  }, []);

  return (
    <div className={`wavy-text ${className}`}>
      <span className='word' ref={distanceRef}>
        DISTANCE
      </span>
      <span className='word' ref={festRef}>
        FEST
      </span>
    </div>
  );
};

export default Logo;
