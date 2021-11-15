import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

import Article from '../../../src/components/Article';
import fetchArticle from '../../../src/fetchArticle';
import Header from '../../../src/components/Header';
import Loading from '../../../src/components/Loading';
import NotFoundPage from '../../../src/NotFoundPage';
import fetchRoles from '../../../src/fetchRoles';

interface IProps {
  showEdit: boolean;
  title: string;
  content: string;
  roles: string[] | null;
}

const Wiki: NextPage<IProps> = ({ showEdit, title, content, roles }) => {
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
      <Header roles={roles} />
      <div className='pb-16'>
        <Article
          title={title}
          content={content}
          roles={roles}
          showEdit={showEdit}
        />
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
