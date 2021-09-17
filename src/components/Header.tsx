const Header = () => {
  return (
    <header className='flex items-center p-6'>
      <div className='text-2xl font-semibold'>Wikipiki&trade;</div>
      <nav className='flex-grow flex'>
        <div className='flex-grow'></div>
        <div className='flex space-x-2'>
          <input
            type='search'
            className='rounded bg-gray-300 px-2 py-1'
            placeholder='Search'
          />
          <button className='bg-gray-400 hover:bg-gray-500 rounded px-3 py-1.5 cursor-pointer'>
            Log in
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
