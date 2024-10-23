const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;

interface DOMElements {
  main: HTMLElement | null;
  scrollable: HTMLElement | null;
}

export default class Scroll {
  DOM: DOMElements;
  docScroll: number;
  scrollToRender: number;
  current: number;
  ease: number;
  speed: number;
  speedTarget: number;

  constructor() {
    this.DOM = { main: document.querySelector("main"), scrollable: null };

    if (this.DOM.main) {
      // the scrollable element
      // we translate this element when scrolling (y-axis)
      this.DOM.scrollable = this.DOM.main.querySelector("div[data-scroll]");
    }

    this.docScroll = 0;
    this.scrollToRender = 0;
    this.current = 0;
    this.ease = 0.1;
    this.speed = 0;
    this.speedTarget = 0;

    // set the body's height
    this.setSize();
    // set the initial values
    this.getScroll();
    this.init();
    // the <main> element's style needs to be modified
    this.style();
    // init/bind events
    this.initEvents();
    // start the render loop
    requestAnimationFrame(() => this.render());
  }

  init() {
    // sets the initial value (no interpolation) - translate the scroll value
    this.current = this.scrollToRender = this.getScroll();
    // translate the scrollable element
    this.setPosition();
  }

  style() {
    if (this.DOM.main) {
      this.DOM.main.style.position = "fixed";
      this.DOM.main.style.width = "100%";
      this.DOM.main.style.height = "100%";
      this.DOM.main.style.top = "0";
      this.DOM.main.style.left = "0";
      this.DOM.main.style.overflow = "hidden";
    }
  }

  getScroll(): number {
    this.docScroll = window.pageYOffset || document.documentElement.scrollTop;
    return this.docScroll;
  }

  initEvents() {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    // on resize reset the body's height
    window.addEventListener("resize", () => this.setSize());
    window.addEventListener("scroll", this.getScroll.bind(this));
  }

  setSize() {
    if (this.DOM.scrollable) {
      // set the height of the body in order to keep the scrollbar on the page
      document.body.style.height = `${this.DOM.scrollable.scrollHeight}px`;
    }
  }

  setPosition() {
    if (
      Math.round(this.scrollToRender) !== Math.round(this.current) ||
      this.scrollToRender < 10
    ) {
      if (this.DOM.scrollable) {
        this.DOM.scrollable.style.transform = `translate3d(0, ${
          -1 * this.scrollToRender
        }px, 0)`;
      }
    }
  }

  render() {
    this.speed =
      Math.min(Math.abs(this.current - this.scrollToRender), 200) / 200;
    this.speedTarget += (this.speed - this.speedTarget) * 0.2;

    this.current = this.getScroll();
    this.scrollToRender = lerp(this.scrollToRender, this.current, this.ease);

    // translate the scrollable element
    this.setPosition();

    // continue rendering
    requestAnimationFrame(() => this.render());
  }
}
