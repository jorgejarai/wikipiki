import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import { useRouter } from 'next/router';

import fetchRoles from '../src/auth/fetchRoles';
import { useRoles } from '../src/auth/RolesContext';
import Article from '../src/components/Article';
import Editor from '../src/components/Editor';
import Header from '../src/components/Header';
import Loading from '../src/components/Loading';
import UnauthorizedPage from '../src/error_pages/UnauthorizedPage';

const WikiEdit = () => {
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
          <title>{`Wikipiki`}</title>
        </Head>
        <Header />
        <div className='pb-16 h-full'>
          <Article title={title} content={content} />
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-screen'>
      <Head>
        <title>{`New article - Wikipiki`}</title>
      </Head>
      <Header />
      <div className='h{-full'>
        <Editor create={true} />
      </div>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    const roles = await fetchRoles(req, res);

    return {
      props: {
        roles,
      },
    };
  },
});

export default WikiEdit;
