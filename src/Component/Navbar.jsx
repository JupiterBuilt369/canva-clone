import { User } from "lucide-react";


const Navbar = () => {
  return (
    <>

      <nav
        className="
    h-20 mx-10 border border-gray-600 bg-gradient-to-br from-yellow-400 via-sky-800 to-rose-600  px-6 flex items-center justify-between rounded-2xl"
      >
        {/* Left: Canva Logo */}

        <img
          src="https://static.canva.com/web/images/8439b51bb7a19f6e65ce1064bc37c197.svg"
          alt="Canva logo"
          className="h-12 w-[150px] object-contain"
        />
        <User className="h-12 w-12 bg-blue-400 border border-blue-600 p-2 rounded-[50%]" />
      </nav>
    </>
  );
};

export default Navbar;
