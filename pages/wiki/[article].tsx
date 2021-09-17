import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

import Article from '../../src/components/Article';
import Header from '../../src/components/Header';
import fetchArticle from '../../src/fetchArticle';
import fetchArticleNames from '../../src/fetchArticleNames';
import NotFoundPage from '../../src/NotFoundPage';

interface IProps {
  title: string;
  breadcrumbs?: string[];
  content: string;
}

interface IParams extends ParsedUrlQuery {
  article: string;
}

const Wiki = ({ title, content }: IProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <Article title={title} content={content} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const titles = await fetchArticleNames();
  const paths = titles.map((title) => ({ params: { article: title } }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<IProps, IParams> = async ({
  params,
}) => {
  const { article: title } = params!;

  const content = await fetchArticle(title);

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
};

export default Wiki;
