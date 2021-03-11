const Dropdown = ({ label }) => {
  return <div className="text-white group inline-block text-opacity-70 hover:text-opacity-100">
    <button
      className="font-normal py-2 px-4 rounded inline-flex items-center"
    >
      <span className="mr-1">{label}</span>
      <svg
        className="fill-current h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
        />
      </svg>
    </button>
    <ul className="absolute hidden text-gray-700 pt-1 group-hover:block">
      <li className="">
        <a className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Action</a>
      </li>
      <li className="">
        <a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Drama</a>
      </li>
      <li className="">
        <a className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Romance</a>
      </li>
    </ul>
  </div>
}

export default Dropdown;