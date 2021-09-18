import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import type { NextPage } from 'next';

import Article from '../src/components/Article';
import Header from '../src/components/Header';

const Home: NextPage = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <Article
        title='Título'
        content='Este es un ejemplo de integral definida: $\int_0^5 f(x) dx = F(x) \big|_0^5 = F(5) - F(0)$'
      />
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default Home;
