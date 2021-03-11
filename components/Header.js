import Link from 'next/link'
import { FaUserCircle } from 'react-icons/fa'

const Header = () => {
  return <div className="sticky top-0 z-40 text-white px-2 border-b-2 border-gray-500 border-opacity-50 appbar">
    <div className="flex flex-row justify-between items-center p-2 max-w-screen-2xl w-full m-auto">
      <Link href="/">
        <a className="text-2xl font-bold">
          <div className="flex flex-row justify-start gap-2 items-center">
            <picture>
              <source srcSet="/logo.png" />
              <img className="max-w-xs max-h-10" src="OtherImage.png" alt="IfItDoesntMatchAnyMedia" />
            </picture>
            <span >Flixplore</span>
          </div>
        </a>
      </Link>
      <div className="w-2/4 max-w-sm">
        <input className="w-full bg-white rounded-full pl-4 pb-0.5 text-black h-9" type="text" name="search" placeholder="Search for Movies" />
      </div>
      <div className="flex flex-row gap-3 justify-end">
        <Link href="/login">
          <button>
            <FaUserCircle size="1.75rem" />
          </button>
        </Link>
      </div>
    </div>
  </div>
}

export default Header