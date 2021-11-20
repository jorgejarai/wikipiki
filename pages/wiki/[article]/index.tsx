import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import fetchArticle from '../../../src/api/fetchArticle';
import Article from '../../../src/components/Article';
import Header from '../../../src/components/Header';
import Loading from '../../../src/components/Loading';

interface IProps {
  error: string | null;
  showEdit: boolean;
  title: string;
  content: string;
}

const Wiki: NextPage<IProps> = ({
  error,
  showEdit,
  title,
  content,
}: IProps) => {
  const { t } = useTranslation('special_pages');
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
        <Article
          title={error ? t(`${error}_title`) : title}
          content={error ? t(`${error}_content`) : content}
          showEdit={showEdit}
        />
      </div>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ params }) => {
    const { article: title } = params!;

    if (title === undefined) {
      return {
        props: {
          error: 'general_error',
          title: '',
          content: '',
          showEdit: false,
        },
      };
    }

    const { error, content } = await fetchArticle(title as string);

    return {
      props: {
        error: error || '',
        title,
        content: content || '',
        showEdit: true,
      },
    };
  },
});

export default Wiki;
