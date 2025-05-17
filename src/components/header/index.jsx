import { FaSearch } from "react-icons/fa";
import { CgMenuRightAlt } from "react-icons/cg";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-4 py-3 bg-[#f7f0e4] text-white relative rounded">
      {/* Logo */}
      <div className="flex gap-2 items-center">
        <img
          src="/logo.jpeg"
          alt="logo"
          className="size-[100px] rounded-full"
        />
      </div>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-4 2xl:gap-6 text-[#966c18] font-medium">
        <a className="hover:text-[#d4b26d]" href="/">
          Ürünler
        </a>
        <a className="hover:text-[#d4b26d]" href="/">
          Tarifler
        </a>
        <a className="hover:text-[#d4b26d]" href="/">
          Markalar
        </a>
        <a className="hover:text-[#d4b26d]" href="/">
          Yakındakiler
        </a>
        <a className="hover:text-[#d4b26d]" href="/">
          Hakkımızda
        </a>
        <FaSearch className="text-[18px] text-[#966c18]" />
      </nav>

      {/* Mobile */}
      <div className="lg:hidden flex items-center gap-3 relative">
        <FaSearch className="text-[18px] text-[#966c18]" />
        <button>
          <CgMenuRightAlt size={24} className="text-[#966c18]" />
        </button>
      </div>
    </header>
  );
};

export default Header;
