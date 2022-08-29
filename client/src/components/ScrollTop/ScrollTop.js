/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "./ScrollTop.css";
import { FaArrowUp } from "react-icons/fa";
export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <div>
          <a
            onClick={scrollToTop}
            href=""
            className="goto-top show-top link"
            title="Về đầu trang"
          >
            <FaArrowUp />
          </a>
        </div>
      )}
    </>
  );
}
