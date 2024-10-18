import { gsap } from "gsap";

export const animateText = (element: HTMLElement) => {
  gsap
    .timeline()
    .to(element, {
      opacity: 0,
      top: -100,
      duration: 0.75,
      delay: 0.35,
      ease: "[0.76, 0, 0.24, 1]",
    })
    .set(element, {
      top: "47.5%",
    });
};

export const reverseText = (element: HTMLElement) => {
  gsap.to(element, {
    opacity: 1,
    top: "40%",
    duration: 0.5,
    delay: 0.4,
    ease: "[0.33, 1, 0.68, 1]",
  });
};
export const animateCurve = (
  pathElement: SVGPathElement,
  initialPath: number,
  targetPath: number
) => {
  gsap.timeline().fromTo(
    pathElement,
    { attr: { d: initialPath } },
    {
      attr: { d: targetPath },
      duration: 0.75,
      delay: 0.35,
      ease: "[0.76, 0, 0.24, 1]",
    }
  );
};

export const reverseCurve = (
  pathElement: SVGPathElement,
  initialPath: string
) => {
  gsap.to(pathElement, {
    attr: { d: initialPath },
    duration: 0.75,
    ease: "[0.76, 0, 0.24, 1]",
  });
};

export const animateTranslate = (element: Element) => {
  gsap
    .timeline()
    .to(element, {
      top: "-100vh",
      duration: 0.75,
      delay: 0.35,
      ease: "[0.76, 0, 0.24, 1]",
    })
    .set(element, {
      top: "100vh",
    });
};

export const reverseTranslate = (element: HTMLElement) => {
  gsap.to(element, {
    top: "-300px",
    duration: 0.75,
    ease: "[0.76, 0, 0.24, 1]",
  });
};
