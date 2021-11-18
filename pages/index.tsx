import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import type { NextPage } from 'next';
import Head from 'next/head';

import fetchArticle from '../src/api/fetchArticle';
import fetchRoles from '../src/auth/fetchRoles';
import Article from '../src/components/Article';
import Header from '../src/components/Header';
import NoMainPage from '../src/error_pages/NoMainPage';

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

    const { content: noMainPageContent } = NoMainPage;

    return {
      props: {
        title,
        content: content || noMainPageContent,
        roles,
      },
    };
  },
});

export default Home;
