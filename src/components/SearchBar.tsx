import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const SearchBar = () => {
  const [show, setShow] = useState(false);

  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 400);

  const [loaded, setLoaded] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    setResults([]);
    setLoaded(false);
  }, [search]);

  useEffect(() => {
    const doSearch = async () => {
      if (debouncedSearch === '') {
        setResults([]);
        return;
      }

      const urlEncoded = encodeURIComponent(debouncedSearch);

      const res = await fetch(`/api/search?q=${urlEncoded}`);
      const { results } = await res.json();

      setResults(results || []);
      setLoaded(true);
    };

    doSearch();
  }, [debouncedSearch]);

  return (
    <>
      <input
        type='search'
        className='rounded bg-gray-300 px-2 py-1'
        placeholder='Search'
        value={search}
        onChange={(event) => {
          setShow(true);
          setSearch(event.target.value);
        }}
        onBlur={() => setShow(false)}
        onFocus={() => setShow(true)}
      />
      {search !== '' && show && loaded && (
        <div className='flex flex-col absolute z-10 w-56 max-h-48 overflow-y-auto mt-9 bg-white rounded shadow-md p-2 space-y-2'>
          {results.length > 0 ? (
            results.map((title, idx) => {
              const urlEncoded = encodeURIComponent(title);

              return (
                <Link key={idx} href={`/wiki/${urlEncoded}`}>
                  <a className='text-black'>{title}</a>
                </Link>
              );
            })
          ) : (
            <span className='text-gray-700'>No results found</span>
          )}
        </div>
      )}
    </>
  );
};

export default SearchBar;
