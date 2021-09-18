import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import type { NextPage } from 'next';

import Article from '../src/components/Article';
import Header from '../src/components/Header';
import fetchArticle from '../src/fetchArticle';

interface IProps {
  content: string;
}

const Home: NextPage<IProps> = ({ content }: IProps) => {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <Article title='Bienvenidx!' content={content} />
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async () => {
    const content = await fetchArticle('Portada');

    return {
      props: {
        content,
      },
    };
  },
});

export default Home;
