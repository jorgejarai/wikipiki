import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

import Article from '../../../src/components/Article';
import fetchArticle from '../../../src/fetchArticle';
import Header from '../../../src/components/Header';
import NotFoundPage from '../../../src/NotFoundPage';
import fetchRoles from '../../../src/fetchRoles';

interface IProps {
  title: string;
  content: string;
  roles: string[] | null;
}

const Wiki: NextPage<IProps> = ({ title, content, roles }) => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  if (router.isFallback || isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push('/api/auth/login');
  }

  return (
    <div className='flex flex-col h-screen'>
      <Head>
        <title>{`${title} - Wikipiki`}</title>
        <meta charSet='utf-8' />
      </Head>
      <Header />
      <div className='pb-16'>
        <Article title={title} content={content} roles={roles} />
      </div>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res, params }) => {
    const { article: title } = params!;

    if (title === undefined) {
      return {
        props: NotFoundPage,
      };
    }

    const content = await fetchArticle(title as string);

    if (content === undefined) {
      return {
        props: NotFoundPage,
      };
    }

    const roles = await fetchRoles(req, res);

    return {
      props: {
        title: title,
        content: content,
        roles,
      },
    };
  },
});

export default Wiki;
