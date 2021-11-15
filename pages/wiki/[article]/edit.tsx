import Head from 'next/head';
import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Article from '../../../src/components/Article';
import Editor from '../../../src/components/Editor';
import Header from '../../../src/components/Header';
import NotFoundPage from '../../../src/NotFoundPage';
import fetchArticle from '../../../src/fetchArticle';

interface IProps {
  title: string;
  content: string;
}

const WikiEdit = ({ title, content }: IProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
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
  getServerSideProps: async ({ params }) => {
    const { article: title } = params!;

    if (title === undefined) {
      return {
        props: {
          title,
          content: null,
        },
      };
    }

    const content = await fetchArticle(title as string);

    if (content === undefined) {
      return {
        props: {
          title,
          content: null,
        },
      };
    }

    return {
      props: {
        title,
        content,
      },
    };
  },
});

export default WikiEdit;
