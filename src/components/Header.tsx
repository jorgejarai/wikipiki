import Link from 'next/link';

import SearchBar from './SearchBar';

interface IProps {
  roles: string[] | null;
}

const Header = ({ roles }: IProps) => {
  return (
    <header className='flex items-center p-6'>
      <Link href='/'>
        <a className='text-2xl font-semibold'>Wikipiki&trade;</a>
      </Link>
      <nav className='flex-grow flex'>
        <div className='flex-grow'></div>
        <div className='flex space-x-2'>
          {roles?.includes('Administrators') && (
            <Link href='/new'>
              <a className='bg-gray-400 hover:bg-gray-500 rounded px-3 py-1.5 mr-2 cursor-pointer'>
                New article
              </a>
            </Link>
          )}
          <SearchBar />
          <Link href='/api/auth/logout'>
            <a className='bg-gray-400 hover:bg-gray-500 rounded px-3 py-1.5 cursor-pointer'>
              Log out
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
