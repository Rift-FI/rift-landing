import Logo from "../../assets/logo.svg";

const navLinks = ["Product", "Customers", "Pricing", "Learn"];

function Header() {
  return (
    <>
      <header className="container grid grid-cols-2 bg-[#E9F3F4]">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center cursor-pointer">
            <img src={Logo} alt="logo" height={35} width={35} />
            <span className="text-4xl font-bold">Paylio</span>
          </div>
          <nav>
            <ul className="hidden md:flex gap-14 text-base font-semibold items-center">
              {navLinks.map((link) => {
                return (
                  <li className="">
                    <a href="">{link}</a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex justify-end items-center md:gap-3 md:px-2">
          <div>
            <a
              className="border-1 border-[#b9bfc7] rounded-xl inline-flex items-center justify-center px-6 py-2 text-[#0B3E4E] text-base font-semibold"
              href=""
            >
              Login
            </a>
          </div>
          <div>
            <a
              className="hidden md:block border-1 border-[#2A8E9E] rounded-xl items-center justify-center px-6 py-2 bg-[#2A8E9E] text-white text-base"
              href=""
            >
              Sign Up
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
