import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import type { NextPage } from 'next';
import Head from 'next/head';

import Article from '../src/components/Article';
import fetchArticle from '../src/fetchArticle';
import Header from '../src/components/Header';

interface IProps {
  title: string;
  content: string;
}

const Home: NextPage<IProps> = ({ title, content }: IProps) => {
  return (
    <div className='flex flex-col h-screen'>
      <Head>
        <title>{`${title} - Wikipiki`}</title>
        <meta charSet='utf-8' />
      </Head>
      <Header />
      <div className='pb-16'>
        <Article title={title} content={content} />
      </div>
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
