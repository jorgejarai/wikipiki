import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

import Article from '../../src/components/Article';
import Header from '../../src/components/Header';
import fetchArticle from '../../src/fetchArticle';
import NotFoundPage from '../../src/NotFoundPage';

interface IProps {
  title: string;
  breadcrumbs?: string[];
  content: string;
}

const Wiki = ({ title, content }: IProps) => {
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
      <Header />
      <Article title={title} content={content} />
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ params }) => {
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

    return {
      props: {
        title: title,
        content: content,
      },
    };
  },
});

export default Wiki;
