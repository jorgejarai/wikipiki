import Head from 'next/head';
import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Article from '../../../src/components/Article';
import Editor from '../../../src/components/Editor';
import Header from '../../../src/components/Header';
import NotFoundPage from '../../../src/NotFoundPage';
import fetchArticle from '../../../src/fetchArticle';
import fetchRoles from '../../../src/fetchRoles';
import UnauthorizedPage from '../../../src/UnauthorizedPage';

interface IProps {
  title: string;
  content: string;
  roles: string[] | null;
}

const WikiEdit = ({ title, content, roles }: IProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!roles?.includes('Administrators')) {
    const { title, content } = UnauthorizedPage;

    return (
      <div className='flex flex-col h-screen'>
        <Head>
          <title>{`${title} - Wikipiki`}</title>
        </Head>
        <Header roles={roles} />
        <div className='pb-16 h-full'>
          <Article title={title} content={content} roles={roles} />
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
        <Header roles={roles} />
        <div className='pb-16 h-full'>
          <Article
            title={NotFoundPage.title}
            content={NotFoundPage.content}
            roles={roles}
          />
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-screen'>
      <Head>
        <title>{`Editing ${title} - Wikipiki`}</title>
      </Head>
      <Header roles={roles} />
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
