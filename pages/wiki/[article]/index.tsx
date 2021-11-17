import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import fetchArticle from '../../../src/api/fetchArticle';
import fetchRoles from '../../../src/auth/fetchRoles';
import Article from '../../../src/components/Article';
import Header from '../../../src/components/Header';
import Loading from '../../../src/components/Loading';
import NotFoundPage from '../../../src/error_pages/NotFoundPage';

interface IProps {
  showEdit: boolean;
  title: string;
  content: string;
}

const Wiki: NextPage<IProps> = ({ showEdit, title, content }) => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  if (router.isFallback || isLoading) {
    return <Loading />;
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
        <Article title={title} content={content} showEdit={showEdit} />
      </div>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res, params }) => {
    const roles = await fetchRoles(req, res);

    const { article: title } = params!;

    if (title === undefined) {
      return {
        props: { ...NotFoundPage, roles, showEdit: false },
      };
    }

    const content = await fetchArticle(title as string);

    if (content === undefined) {
      return {
        props: { ...NotFoundPage, roles, showEdit: false },
      };
    }

    return {
      props: {
        title: title,
        content: content,
        showEdit: true,
        roles,
      },
    };
  },
});

export default Wiki;
