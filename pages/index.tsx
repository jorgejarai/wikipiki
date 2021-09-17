import type { NextPage } from 'next';
import Article from '../src/components/Article';
import Header from '../src/components/Header';

const Home: NextPage = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <Article title='Título' breadcrumbs={['Programación', 'C++']} />
    </div>
  );
};

export default Home;
