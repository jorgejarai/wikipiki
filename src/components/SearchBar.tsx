import { useState } from 'react';

const SearchBar = () => {
  const [search, setSearch] = useState('');

  return (
    <>
      <input
        type='search'
        className='rounded bg-gray-300 px-2 py-1'
        placeholder='Search'
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </>
  );
};

export default SearchBar;
