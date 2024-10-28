import Logo from "../../icons/Logo";
const Header = () => {
  return (
    <>
      <div className="flex flex-row align-middle items-center w-full h-10 p-2 bg-gray-100 border-b border-zinc-300">
        <div className="w-28">
          <Logo />
        </div>
      </div>
    </>
  );
};

export default Header;
