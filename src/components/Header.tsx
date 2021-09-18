import Link from 'next/link';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <header className='flex items-center p-6'>
      <div className='text-2xl font-semibold'>Wikipiki&trade;</div>
      <nav className='flex-grow flex'>
        <div className='flex-grow'></div>
        <div className='flex space-x-2'>
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
