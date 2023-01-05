import logo from "../assets/unsplash_logo.svg";
export default function Navbar() {
  return (
    <nav className="flex w-full h-24 p-4">
      <div className='ml-3'>
        <img src={logo} alt="my-unsplash logo" />
      </div>
      <div className=" w-3/4 sm:w-2/4">
        <input
          type={"text"}
          placeholder="search unsplash"
          className="ml-7 w-full  p-3 rounded-3xl
           transition ease-in  border-solid border-black/50
            outline-black bg-gray-200 focus:border-gray-500/50"
        />
      </div>
      <div className="flex lg:hidden">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </div>
    </nav>
  );
}
