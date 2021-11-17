import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import { useRouter } from 'next/router';

import fetchArticle from '../../../src/api/fetchArticle';
import fetchRoles from '../../../src/auth/fetchRoles';
import { useRoles } from '../../../src/auth/RolesContext';
import Article from '../../../src/components/Article';
import Editor from '../../../src/components/Editor';
import Header from '../../../src/components/Header';
import Loading from '../../../src/components/Loading';
import NotFoundPage from '../../../src/error_pages/NotFoundPage';
import UnauthorizedPage from '../../../src/error_pages/UnauthorizedPage';

interface IProps {
  title: string;
  content: string;
}

const WikiEdit = ({ title, content }: IProps) => {
  const roles = useRoles();
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  if (!roles?.includes('Administrators')) {
    const { title, content } = UnauthorizedPage;

    return (
      <div className='flex flex-col h-screen'>
        <Head>
          <title>{`${title} - Wikipiki`}</title>
        </Head>
        <Header />
        <div className='pb-16 h-full'>
          <Article title={title} content={content} />
        </div>
      </div>
    );
  }

  if (title === null || content === null) {
    return (
      <div className='flex flex-col h-screen'>
        <Head>
          <title>{`${title} - Wikipiki`}</title>
        </Head>
        <Header />
        <div className='pb-16 h-full'>
          <Article title={NotFoundPage.title} content={NotFoundPage.content} />
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-screen'>
      <Head>
        <title>{`Editing ${title} - Wikipiki`}</title>
      </Head>
      <Header />
      <div className='h-full'>
        <Editor title={title} initialContent={content} />
      </div>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res, params }) => {
    const { article: title } = params!;
    const roles = await fetchRoles(req, res);

    if (title === undefined) {
      return {
        props: {
          title,
          content: null,
          roles,
        },
      };
    }

    const content = await fetchArticle(title as string);

    if (content === undefined) {
      return {
        props: {
          title,
          content: null,
          roles,
        },
      };
    }

    return {
      props: {
        title,
        content,
        roles,
      },
    };
  },
});

export default WikiEdit;
