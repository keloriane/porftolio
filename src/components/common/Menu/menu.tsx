"use client";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "../Logo/logo";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Header */}
      <header className="fixed w-full top-0 left-0 z-50 text-primary px-2 sm:px-10 border-b pt-[5px] pb-[5px] bg-body/80  backdrop-blur-sm border-[#D9D9D9]">
        <div className="flex justify-between items-center">
          {/* Left Section: Name */}
          <div className="flex items-center gap-[24px]">
            <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-[50px]">
              <Link href="/">
                <Logo />
              </Link>
            </h1>
            <nav className="hidden md:flex space-x-6 text-[16px]">
              <a href="/#about" className="hover:text-accent">
                About
              </a>
              <a href="/#projects" className="hover:text-accent">
                Projects
              </a>
              <a href="/#expertises" className="hover:text-accent">
                Expertises
              </a>
              <a href="/#testimonials" className="hover:text-accent">
                Testimonials
              </a>
              <a href="/contact" className="hover:text-accent">
                Contact
              </a>
            </nav>
          </div>

          {/* Burger Menu (Hidden on Desktop) */}
          <button
            className="flex md:hidden focus:outline-none"
            onClick={toggleMenu}
          >
            <div className="space-y-2">
              <span className="block w-8 h-0.5 bg-primary"></span>
              <span className="block w-8 h-0.5 bg-primary"></span>
              <span className="block w-8 h-0.5 bg-primary"></span>
            </div>
          </button>

          {/* Navigation Links (Visible on Desktop) */}

          {/* Right Section: Social Icons and Call to Action (Visible on Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="https://github.com/keloriane" target="_blank">
              <svg
                width="22"
                height="21"
                viewBox="0 0 22 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.32926 16.764C7.32926 16.8489 7.23164 16.9168 7.10857 16.9168C6.96852 16.9295 6.8709 16.8616 6.8709 16.764C6.8709 16.6791 6.96852 16.6112 7.09159 16.6112C7.21891 16.5985 7.32926 16.6664 7.32926 16.764ZM6.00937 16.573C5.97966 16.6579 6.06454 16.7555 6.19186 16.781C6.30221 16.8234 6.42953 16.781 6.45499 16.6961C6.48046 16.6112 6.39982 16.5136 6.2725 16.4754C6.16216 16.4457 6.03908 16.4881 6.00937 16.573ZM7.88522 16.5009C7.76215 16.5306 7.67726 16.6112 7.69 16.7088C7.70273 16.7937 7.81307 16.8489 7.94039 16.8192C8.06347 16.7895 8.14835 16.7088 8.13562 16.624C8.12289 16.5433 8.0083 16.4881 7.88522 16.5009ZM10.6778 0.237854C4.79134 0.237854 0.288452 4.70679 0.288452 10.5932C0.288452 15.2998 3.25077 19.3274 7.48204 20.7449C8.02527 20.8425 8.21625 20.5072 8.21625 20.2314C8.21625 19.9682 8.20352 18.5168 8.20352 17.6255C8.20352 17.6255 5.23272 18.2621 4.60885 16.3608C4.60885 16.3608 4.12503 15.1258 3.42902 14.8075C3.42902 14.8075 2.45714 14.1412 3.49692 14.1539C3.49692 14.1539 4.55368 14.2388 5.13511 15.2489C6.06454 16.8871 7.62209 16.416 8.22899 16.1359C8.3266 15.4569 8.60246 14.9858 8.90803 14.7057C6.53563 14.4425 4.14201 14.0988 4.14201 10.016C4.14201 8.84894 4.46455 8.26327 5.14359 7.51632C5.03325 7.24046 4.67251 6.10307 5.25394 4.63464C6.14093 4.35878 8.1823 5.78052 8.1823 5.78052C9.0311 5.54286 9.94356 5.41978 10.8475 5.41978C11.7515 5.41978 12.664 5.54286 13.5128 5.78052C13.5128 5.78052 15.5541 4.35454 16.4411 4.63464C17.0226 6.10731 16.6618 7.24046 16.5515 7.51632C17.2305 8.26751 17.6464 8.85318 17.6464 10.016C17.6464 14.1115 15.1467 14.4383 12.7743 14.7057C13.1648 15.0409 13.4958 15.6775 13.4958 16.6749C13.4958 18.1051 13.4831 19.8749 13.4831 20.2229C13.4831 20.4987 13.6783 20.834 14.2173 20.7364C18.4613 19.3274 21.3387 15.2998 21.3387 10.5932C21.3387 4.70679 16.5642 0.237854 10.6778 0.237854ZM4.41362 14.8754C4.35845 14.9179 4.37118 15.0155 4.44333 15.0961C4.51124 15.164 4.60885 15.1937 4.66402 15.1386C4.71919 15.0961 4.70646 14.9985 4.63431 14.9179C4.56641 14.85 4.4688 14.8203 4.41362 14.8754ZM3.95527 14.5317C3.92556 14.5868 3.968 14.6547 4.05288 14.6972C4.12079 14.7396 4.20567 14.7269 4.23538 14.6675C4.26508 14.6123 4.22264 14.5444 4.13776 14.502C4.05288 14.4765 3.98498 14.4892 3.95527 14.5317ZM5.33033 16.0425C5.26243 16.0977 5.28789 16.225 5.3855 16.3057C5.48311 16.4033 5.60619 16.416 5.66136 16.3481C5.71653 16.2929 5.69107 16.1656 5.60619 16.085C5.51282 15.9874 5.3855 15.9746 5.33033 16.0425ZM4.84651 15.4187C4.77861 15.4611 4.77861 15.5714 4.84651 15.6691C4.91442 15.7667 5.02901 15.8091 5.08418 15.7667C5.15208 15.7115 5.15208 15.6012 5.08418 15.5035C5.02476 15.4059 4.91442 15.3635 4.84651 15.4187Z"
                  fill="#212121"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/kevin-flabat-420a74ba/"
              target="_blank"
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.93297 20.7622H0.67774V7.05914H4.93297V20.7622ZM2.80306 5.18992C1.44238 5.18992 0.338715 4.06289 0.338715 2.7022C0.338715 2.04862 0.598351 1.4218 1.06051 0.959645C1.52266 0.49749 2.14948 0.237854 2.80306 0.237854C3.45665 0.237854 4.08347 0.49749 4.54562 0.959645C5.00778 1.4218 5.26741 2.04862 5.26741 2.7022C5.26741 4.06289 4.16329 5.18992 2.80306 5.18992ZM20.8589 20.7622H16.6129V14.0916C16.6129 12.5019 16.5808 10.4631 14.4005 10.4631C12.1881 10.4631 11.8491 12.1903 11.8491 13.9771V20.7622H7.59844V7.05914H11.6796V8.92836H11.7391C12.3072 7.85172 13.6949 6.71553 15.7653 6.71553C20.0718 6.71553 20.8635 9.55143 20.8635 13.2349V20.7622H20.8589Z"
                  fill="#212121"
                />
              </svg>
            </a>
            <a href="mailto:kevin.flbt@gmail.com">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_114_279)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.51888 14.1098L12.9342 16.445L16.2264 14.1738L23.6061 21.4546C23.4118 21.5173 23.2043 21.5511 22.9883 21.5511H2.8753C2.6098 21.5511 2.35637 21.4992 2.12345 21.4063L9.51888 14.1098ZM25 8.12638V19.5393C25 19.8374 24.9349 20.1198 24.819 20.3745L17.5853 13.2373L25 8.12638ZM0.863527 8.19035L8.15516 13.1769L0.99145 20.2465C0.906605 20.0204 0.863269 19.7808 0.863527 19.5393V8.19035ZM22.9883 3.44873C24.0985 3.44873 25 4.34902 25 5.46051V6.16771L12.9294 14.4888L0.863527 6.2365V5.46051C0.863527 4.35023 1.76382 3.44873 2.8753 3.44873H22.9883Z"
                    fill="#212121"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_114_279">
                    <rect
                      width="24.1365"
                      height="24.1365"
                      fill="white"
                      transform="translate(0.863525 0.431763)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-gray-900 text-bodywhite transform transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 text-bodywhite focus:outline-none"
          onClick={toggleMenu}
        >
          <span className="text-4xl">&times;</span>
        </button>

        {/* Fullscreen Menu Content */}
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-white">
          <nav className="text-center text-2xl">
            <a href="/#about" className="block py-2 hover:text-gray-400">
              About
            </a>
            <a href="/#projects" className="block py-2 hover:text-gray-400">
              Projects
            </a>
            <a href="/#expertises" className="block py-2 hover:text-gray-400">
              Expertises
            </a>
            <a href="/#testimonials" className="block py-2 hover:text-gray-400">
              Testimonials
            </a>
            <a href="/contact" className="block py-2 hover:text-gray-400">
              Contact
            </a>
          </nav>

          {/* Social Icons */}
          <div className="flex space-x-6">
            <a href="https://github.com/your-github" target="_blank">
              <svg
                width="22"
                height="21"
                viewBox="0 0 22 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.32926 16.764C7.32926 16.8489 7.23164 16.9168 7.10857 16.9168C6.96852 16.9295 6.8709 16.8616 6.8709 16.764C6.8709 16.6791 6.96852 16.6112 7.09159 16.6112C7.21891 16.5985 7.32926 16.6664 7.32926 16.764ZM6.00937 16.573C5.97966 16.6579 6.06454 16.7555 6.19186 16.781C6.30221 16.8234 6.42953 16.781 6.45499 16.6961C6.48046 16.6112 6.39982 16.5136 6.2725 16.4754C6.16216 16.4457 6.03908 16.4881 6.00937 16.573ZM7.88522 16.5009C7.76215 16.5306 7.67726 16.6112 7.69 16.7088C7.70273 16.7937 7.81307 16.8489 7.94039 16.8192C8.06347 16.7895 8.14835 16.7088 8.13562 16.624C8.12289 16.5433 8.0083 16.4881 7.88522 16.5009ZM10.6778 0.237854C4.79134 0.237854 0.288452 4.70679 0.288452 10.5932C0.288452 15.2998 3.25077 19.3274 7.48204 20.7449C8.02527 20.8425 8.21625 20.5072 8.21625 20.2314C8.21625 19.9682 8.20352 18.5168 8.20352 17.6255C8.20352 17.6255 5.23272 18.2621 4.60885 16.3608C4.60885 16.3608 4.12503 15.1258 3.42902 14.8075C3.42902 14.8075 2.45714 14.1412 3.49692 14.1539C3.49692 14.1539 4.55368 14.2388 5.13511 15.2489C6.06454 16.8871 7.62209 16.416 8.22899 16.1359C8.3266 15.4569 8.60246 14.9858 8.90803 14.7057C6.53563 14.4425 4.14201 14.0988 4.14201 10.016C4.14201 8.84894 4.46455 8.26327 5.14359 7.51632C5.03325 7.24046 4.67251 6.10307 5.25394 4.63464C6.14093 4.35878 8.1823 5.78052 8.1823 5.78052C9.0311 5.54286 9.94356 5.41978 10.8475 5.41978C11.7515 5.41978 12.664 5.54286 13.5128 5.78052C13.5128 5.78052 15.5541 4.35454 16.4411 4.63464C17.0226 6.10731 16.6618 7.24046 16.5515 7.51632C17.2305 8.26751 17.6464 8.85318 17.6464 10.016C17.6464 14.1115 15.1467 14.4383 12.7743 14.7057C13.1648 15.0409 13.4958 15.6775 13.4958 16.6749C13.4958 18.1051 13.4831 19.8749 13.4831 20.2229C13.4831 20.4987 13.6783 20.834 14.2173 20.7364C18.4613 19.3274 21.3387 15.2998 21.3387 10.5932C21.3387 4.70679 16.5642 0.237854 10.6778 0.237854ZM4.41362 14.8754C4.35845 14.9179 4.37118 15.0155 4.44333 15.0961C4.51124 15.164 4.60885 15.1937 4.66402 15.1386C4.71919 15.0961 4.70646 14.9985 4.63431 14.9179C4.56641 14.85 4.4688 14.8203 4.41362 14.8754ZM3.95527 14.5317C3.92556 14.5868 3.968 14.6547 4.05288 14.6972C4.12079 14.7396 4.20567 14.7269 4.23538 14.6675C4.26508 14.6123 4.22264 14.5444 4.13776 14.502C4.05288 14.4765 3.98498 14.4892 3.95527 14.5317ZM5.33033 16.0425C5.26243 16.0977 5.28789 16.225 5.3855 16.3057C5.48311 16.4033 5.60619 16.416 5.66136 16.3481C5.71653 16.2929 5.69107 16.1656 5.60619 16.085C5.51282 15.9874 5.3855 15.9746 5.33033 16.0425ZM4.84651 15.4187C4.77861 15.4611 4.77861 15.5714 4.84651 15.6691C4.91442 15.7667 5.02901 15.8091 5.08418 15.7667C5.15208 15.7115 5.15208 15.6012 5.08418 15.5035C5.02476 15.4059 4.91442 15.3635 4.84651 15.4187Z"
                  fill="#ffffff"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/kevin-flabat-420a74ba/"
              target="_blank"
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.93297 20.7622H0.67774V7.05914H4.93297V20.7622ZM2.80306 5.18992C1.44238 5.18992 0.338715 4.06289 0.338715 2.7022C0.338715 2.04862 0.598351 1.4218 1.06051 0.959645C1.52266 0.49749 2.14948 0.237854 2.80306 0.237854C3.45665 0.237854 4.08347 0.49749 4.54562 0.959645C5.00778 1.4218 5.26741 2.04862 5.26741 2.7022C5.26741 4.06289 4.16329 5.18992 2.80306 5.18992ZM20.8589 20.7622H16.6129V14.0916C16.6129 12.5019 16.5808 10.4631 14.4005 10.4631C12.1881 10.4631 11.8491 12.1903 11.8491 13.9771V20.7622H7.59844V7.05914H11.6796V8.92836H11.7391C12.3072 7.85172 13.6949 6.71553 15.7653 6.71553C20.0718 6.71553 20.8635 9.55143 20.8635 13.2349V20.7622H20.8589Z"
                  fill="#ffffff"
                />
              </svg>
            </a>
            <a href="mailto:kevin.flbt@gmail.com">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_114_279)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.51888 14.1098L12.9342 16.445L16.2264 14.1738L23.6061 21.4546C23.4118 21.5173 23.2043 21.5511 22.9883 21.5511H2.8753C2.6098 21.5511 2.35637 21.4992 2.12345 21.4063L9.51888 14.1098ZM25 8.12638V19.5393C25 19.8374 24.9349 20.1198 24.819 20.3745L17.5853 13.2373L25 8.12638ZM0.863527 8.19035L8.15516 13.1769L0.99145 20.2465C0.906605 20.0204 0.863269 19.7808 0.863527 19.5393V8.19035ZM22.9883 3.44873C24.0985 3.44873 25 4.34902 25 5.46051V6.16771L12.9294 14.4888L0.863527 6.2365V5.46051C0.863527 4.35023 1.76382 3.44873 2.8753 3.44873H22.9883Z"
                    fill="#ffffff"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_114_279">
                    <rect
                      width="24.1365"
                      height="24.1365"
                      fill="bodywhite"
                      transform="translate(0.863525 0.431763)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
