export const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 h-16 w-full items-center p-4 text-white">
      <div className="mx-auto flex w-full max-w-3/4 items-center justify-between">
        <div className="text-2xl font-bold">Mateusz Pasek</div>
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
