import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import Article from '../src/components/Article';
import Editor from '../src/components/Editor';
import Header from '../src/components/Header';
import Loading from '../src/components/Loading';
import useRoles from '../src/hooks/useRoles';

const WikiEdit = () => {
  const { t } = useTranslation('special_pages');

  const roles = useRoles();
  const router = useRouter();

  if (!roles || router.isFallback) {
    return <Loading />;
  }

  if (!roles?.includes('Administrators')) {
    return (
      <div className='flex flex-col h-screen'>
        <Head>
          <title>{`${t`unauthorized_title`} - Wikipiki`}</title>
        </Head>
        <Header />
        <div className='pb-16 h-full'>
          <Article
            title={t`unauthorized_title`}
            content={t`unauthorized_content`}
            showEdit={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-screen'>
      <Head>
        <title>{`${t`new_article`} - Wikipiki`}</title>
      </Head>
      <Header />
      <div className='h-full'>
        <Editor create={true} />
      </div>
    </div>
  );
};

export default withPageAuthRequired(WikiEdit);
