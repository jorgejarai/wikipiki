import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import fetchArticle from '../../../src/api/fetchArticle';
import { useRoles } from '../../../src/auth/RolesContext';
import Article from '../../../src/components/Article';
import Editor from '../../../src/components/Editor';
import Header from '../../../src/components/Header';
import Loading from '../../../src/components/Loading';

interface IProps {
  error: string | null;
  title: string;
  content: string;
}

const WikiEdit = ({ title, content }: IProps) => {
  const { t } = useTranslation('special_pages');
  const roles = useRoles();
  const router = useRouter();

  if (router.isFallback) {
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
          />
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
          <Article title={t`not_found_title`} content={t`not_found_content`} />
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-screen'>
      <Head>
        <title>{t(`page_edit_title`, { title })}</title>
      </Head>
      <Header />
      <div className='h-full'>
        <Editor title={title} initialContent={content} />
      </div>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ params }) => {
    const { article: title } = params!;
    const { content, error } = await fetchArticle(title as string);

    return {
      props: {
        error: error || '',
        title,
        content: content || '',
      },
    };
  },
});

export default WikiEdit;
