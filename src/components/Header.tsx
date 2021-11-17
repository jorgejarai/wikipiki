import Link from 'next/link';
import { useState } from 'react';
import { MdSearch, MdOutlineLogout, MdPostAdd } from 'react-icons/md';

import SearchBar from './SearchBar';

interface IProps {
  roles: string[] | null;
}

const Header = ({ roles }: IProps) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className='flex flex-col'>
      <header className='flex items-center justify-between p-6'>
        <Link href='/'>
          <a className='text-2xl font-semibold'>Wikipiki&trade;</a>
        </Link>
        <nav className='flex flex-col md:flex-row'>
          <div className='hidden md:block flex-grow'></div>
          <div className='flex space-x-2'>
            {roles?.includes('Administrators') && (
              <Link href='/new'>
                <a className='flex items-center justify-center h-6 md:h-9 px-2 md:px-3 py-4 md:py-1.5 bg-gray-400 hover:bg-gray-500 rounded cursor-pointer'>
                  <span className='hidden md:block'>New article</span>
                  <MdPostAdd className='md:hidden' />
                </a>
              </Link>
            )}
            <div className='items-center hidden md:block'>
              <SearchBar />
            </div>
            <div className='md:hidden'>
              <button
                onClick={() => setShowSearch((prev) => !prev)}
                className={`h-6 px-2 py-4 flex items-center justify-center ${
                  showSearch ? 'bg-gray-500' : 'bg-gray-400'
                } hover:bg-gray-500 rounded`}
              >
                <MdSearch />
              </button>
            </div>
            <Link href='/api/auth/logout'>
              <a className='flex items-center justify-center h-6 md:h-9 px-2 md:px-3 py-4 md:py-1.5 bg-gray-400 hover:bg-gray-500 rounded mr-2 cursor-pointer'>
                <span className='hidden md:block'>Log out</span>
                <MdOutlineLogout className='md:hidden' />
              </a>
            </Link>
          </div>
        </nav>
      </header>
      {showSearch && (
        <div className='px-8 md:hidden'>
          <SearchBar />
        </div>
      )}
    </div>
  );
};

export default Header;
