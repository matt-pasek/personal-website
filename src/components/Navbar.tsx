export const Navbar = () => {
  return (
    <div className="absolute top-6 left-0 h-16 w-full items-center p-4 text-white">
      <div className="mx-auto flex w-3/5 min-w-6xl items-center justify-between">
        <div className="text-3xl font-bold">Mateusz Pasek</div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
