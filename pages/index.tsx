import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import type { NextPage } from 'next';

import Article from '../src/components/Article';
import Header from '../src/components/Header';
import fetchArticle from '../src/fetchArticle';

interface IProps {
  title: string;
  content: string;
}

const Home: NextPage<IProps> = ({ title, content }: IProps) => {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <Article title={title} content={content} />
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async () => {
    const title = process.env.START_ARTICLE!;
    const content = await fetchArticle(title);

    return {
      props: {
        title,
        content,
      },
    };
  },
});

export default Home;
