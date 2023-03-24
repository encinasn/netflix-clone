import { useState, useCallback, useEffect } from "react";
import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

export default function Navbar() {
  const [showBackground, setShowBackground] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackground(window.scrollY >= TOP_OFFSET);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="fixed z-40 w-full">
      <div
        className={`flex flex-row px-4 py-5 transition duration-500 md:px-16 ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : "bg-gradient-to-b from-black/50 to-transparent"
        }`}
      >
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="Netflix" />

        <div className="ml-8 hidden flex-row gap-7 md:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse" />
        </div>

        <div
          onClick={toggleMobileMenu}
          className="relative ml-8 flex cursor-pointer flex-row items-center gap-2 lg:hidden"
        >
          <p className="text-sm text-white">Browse</p>
          <BsChevronDown
            className={`text-white transition duration-200 ${
              showMobileMenu ? "rotate-180" : ""
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>

        <div className="ml-auto flex flex-row items-center gap-7">
          <div className="cursor-pointer text-gray-200 transition hover:text-gray-300">
            <BsSearch />
          </div>

          <div className="cursor-pointer text-gray-200 transition hover:text-gray-300">
            <BsBell />
          </div>

          <div
            className="relative flex cursor-pointer flex-row items-center gap-2"
            onClick={toggleAccountMenu}
          >
            <div className="h-6 w-6 overflow-hidden rounded-md lg:h-8 lg:w-8">
              <img src="/images/default-blue.png" alt="" />
            </div>
            <BsChevronDown
              className={`text-white transition duration-200 ${
                showAccountMenu ? "rotate-180" : ""
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}
