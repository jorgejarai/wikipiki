import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import type { NextPage } from 'next';
import Head from 'next/head';

import Article from '../src/components/Article';
import Header from '../src/components/Header';
import fetchArticle from '../src/fetchArticle';
import fetchRoles from '../src/fetchRoles';

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
  getServerSideProps: async ({ req, res }) => {
    const title = process.env.START_ARTICLE!;
    const content = await fetchArticle(title);
    const roles = await fetchRoles(req, res);

    return {
      props: {
        title,
        content,
        roles,
      },
    };
  },
});

export default Home;
