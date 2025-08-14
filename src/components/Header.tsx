import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { name: "Developers", url: "https://docs.riftfi.xyz" },
  { name: "Contact Sales", url: "mailto:admin@sphereramp.com" },
  { name: "Legal", url: "#" }
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="container grid grid-cols-2 lg:grid-cols-4 bg-[#E9F3F4]">
        <div className="flex gap-2 items-center cursor-pointer">
          <img src="/logo.png" alt="Rift Finance Logo" height={70} width={70} loading="lazy" />
          <span className="text-3xl md:text-4xl font-bold">Rift</span>
        </div>

        <button className="lg:hidden justify-self-end" onClick={toggleNavbar}>
          <Menu />
        </button>

        <div className="hidden lg:flex justify-between items-center col-span-3">
          <nav>
            <ul className="flex gap-14 text-base font-semibold items-center">
              {navLinks.map((link) => {
                return (
                  <li key={link.name}>
                    <a href={link.url} target={link.url.startsWith('http') ? '_blank' : '_self'} rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}>{link.name}</a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex justify-end items-center md:gap-3 md:px-2">
            <div>
              <a
                className="border-1 border-[#2A8E9E] rounded-xl items-center justify-center px-6 py-2 bg-[#2A8E9E] text-white text-base"
                href="https://docs.google.com/forms/d/e/1FAIpQLScXU4NMfJmsEE0qsJ5z5ALslnUZi-9OhfrAGdTNhC-fxk4fJQ/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
              >
                Talk to Us
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50">
            <div className="lg:hidden fixed top-0 right-0 w-3/4 h-screen z-50 bg-[#fefefe] py-8 border-l border-[#2A8E9E] shadow-lg">
              <div className="flex justify-end px-4">
                <button onClick={toggleNavbar}>
                  <X />
                </button>
              </div>

              <nav>
                <ul className="space-y-4 text-base font-semibold text-center pt-12">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <a href={link.url} target={link.url.startsWith('http') ? '_blank' : '_self'} rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex flex-col items-center gap-4 mt-10">
                <a
                  className="border border-[#2A8E9E] rounded-xl px-6 py-2 bg-[#2A8E9E] text-white text-base"
                  href="https://docs.google.com/forms/d/e/1FAIpQLScXU4NMfJmsEE0qsJ5z5ALslnUZi-9OhfrAGdTNhC-fxk4fJQ/viewform?usp=header"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Talk to Us
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
