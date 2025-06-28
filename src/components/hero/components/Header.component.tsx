import Logo from "../../../assets/passport.svg";

const navLinks = ["Product", "Customers", "Pricing", "Learn"];

function Header() {
  return (
    <>
      <header className="container grid grid-cols-2 bg-[#E9F3F4]">
        <div className="flex justify-between items-center">
          <div className="flex gap-0.5 items-center">
            <img src={Logo} alt="logo" height={25} width={25} />
            <span className="text-4xl font-extrabold">Paylio</span>
          </div>
          <nav className="px-16">
            <ul className="flex gap-12 text-base font-semibold items-center">
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

        <div className="flex justify-end items-center gap-2">
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
              className="border-1 border-[#2A8E9E] rounded-xl inline-flex items-center justify-center px-6 py-2 bg-[#2A8E9E] text-white text-base font-semibold"
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
