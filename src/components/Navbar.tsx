export const Navbar = () => {
  return (
    <div className="absolute top-6 left-0 z-50 hidden h-16 w-full items-center p-4 text-white md:block">
      <div className="mx-auto flex w-full items-center justify-between md:w-3/5 md:min-w-6xl">
        <div className="text-3xl font-bold">Mateusz Pasek</div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#about" className="transition-colors hover:text-[#C896FF]">
                About
              </a>
            </li>
            <li>
              <a href="#work" className="transition-colors hover:text-[#C896FF]">
                Work
              </a>
            </li>
            <li>
              <a href="#contact" className="transition-colors hover:text-[#C896FF]">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
