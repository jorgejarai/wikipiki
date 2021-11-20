import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';

import fetchArticle from '../src/api/fetchArticle';
import Article from '../src/components/Article';
import Header from '../src/components/Header';

interface IProps {
  error: string | null;
  title: string;
  content: string;
  roles: string[] | null;
}

const Home: NextPage<IProps> = ({ error, title, content }: IProps) => {
  const { t } = useTranslation('special_pages');

  return (
    <div className='flex flex-col h-screen'>
      <Head>
        <title>{`${title} - Wikipiki`}</title>
        <meta charSet='utf-8' />
      </Head>
      <Header />
      <div className='pb-16'>
        <Article
          title={error ? t(`${error}_title`) : title}
          content={error ? t(`${error}_content`) : content}
        />
      </div>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async () => {
    const title = process.env.START_ARTICLE!;
    const { content, error } = await fetchArticle(title);

    return {
      props: {
        error: error || '',
        title,
        content: content || '',
      },
    };
  },
});

export default Home;
