import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className='flex flex-col h-screen'>
      <header className='flex items-center p-6'>
        <div className='text-2xl font-semibold'>Wiki</div>
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
      <section className='flex-grow overflow-y-auto flex flex-col items-center'>
        <header className='w-full md:w-2/3 px-8 md:px-0'>
          <div className='text-sm'>
            <span className='cursor-pointer'>Programación</span>
            <span className='text-gray-400 px-1'>/</span>
            <span className='cursor-pointer'>C++</span>
          </div>
          <h1 className='pt-2 text-4xl font-bold'>Título</h1>
        </header>
        <article className='pt-4 w-full md:w-2/3 px-8 md:px-0 text-justify'>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta,
            voluptatem non. Odit rem dolores non tempore velit, facilis
            perspiciatis ex nisi! Porro in illum exercitationem, fugiat quas
            atque! Laboriosam, ducimus.
          </p>
        </article>
      </section>
    </div>
  );
};

export default Home;
