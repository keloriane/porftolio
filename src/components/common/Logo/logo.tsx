import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Logo = () => {
  const rectRef1 = useRef(null);
  const rectRef2 = useRef(null);
  const rectRef3 = useRef(null);

  const colors = ["#2d3142", "#4f5d75", "#bfc0c0", "#942828", "#ef8354"];
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const animateColorChange = () => {
      const nextColorIndex = (currentColorIndex + 1) % colors.length; // Cycle through the colors

      // Animate the color change for all rectangles using GSAP
      gsap.to([rectRef1.current, rectRef2.current, rectRef3.current], {
        fill: colors[nextColorIndex],
        duration: 10, // Smooth transition over 1 second
        ease: "power2.inOut",
      });

      setCurrentColorIndex(nextColorIndex); // Update the current color index
    };

    const intervalId = setInterval(animateColorChange, 10000); // Change color every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [currentColorIndex, colors]);

  return (
    <div>
      <svg
        width="52"
        height="59"
        viewBox="0 0 52 59"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          ref={rectRef1}
          y="-6.10352e-05"
          width="22.6982"
          height="52.3676"
          rx="8.53275"
          fill={colors[currentColorIndex]} // Set initial color
        />
        <rect
          ref={rectRef2}
          x="29.8389"
          y="0.390137"
          width="22.6982"
          height="46.7931"
          rx="8.53275"
          transform="rotate(39.6189 29.8389 0.390137)"
          fill={colors[currentColorIndex]} // Set initial color
        />
        <rect
          ref={rectRef3}
          x="51.4866"
          y="42.8381"
          width="22.6982"
          height="46.7931"
          rx="8.53275"
          transform="rotate(134.599 51.4866 42.8381)"
          fill={colors[currentColorIndex]} // Set initial color
        />
        <path
          d="M4.95863 37.4443V20.215H9.63612V27.1807H9.87167L15.0539 20.215H20.5054L14.6838 27.8874L20.64 37.4443H15.0539L11.1841 30.9833L9.63612 33.0023V37.4443H4.95863ZM21.8935 37.4443V20.215H34.0078V23.9839H26.571V26.9452H33.2675V30.7141H26.571V37.4443H21.8935Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default Logo;
