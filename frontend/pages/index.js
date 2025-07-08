import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Logo from "../components/Logo";

export default function Live() {
  const ref = useRef("");
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    setIsSticky(ref.current.getBoundingClientRect().top <= 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Home - Distance Fest</title>
      </Head>

      <div className={"home"}>
        <div className='header'>
          <div className='welcome center-align'>
            <h1 data-text='Welcome To Distance Fest'>
              <a href='/'>
                <Logo className='wavy-text' />
              </a>
            </h1>
          </div>
          <h2>Live Music from Safe Spaces</h2>
          <h3 className='center-align' data-text="New Year's Eve">
            Stay Tuned
          </h3>
        </div>
        <div
          className={`sticky-wrapper${isSticky ? " sticky" : ""}`}
          ref={ref}
        ></div>
      </div>
    </>
  );
}
