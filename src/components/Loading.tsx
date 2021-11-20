import Head from 'next/head';

const Loading = () => {
  return (
    <>
      <Head>
        <title>Wikipiki</title>
      </Head>
      <div className='w-screen h-screen flex items-center justify-center'>
        <svg
          style={{
            stroke: 'rgba(31, 41, 55, 1)',
            fill: 'white',
            strokeWidth: 5,
            width: 100,
            height: 100,
          }}
          className='animate-spin'
        >
          <path d=' M 90 50 A 40 40 0 1 1 70 15' />
        </svg>
      </div>
    </>
  );
};

export default Loading;
