import Link from 'next/link';

import Markdown from './Markdown';

interface IProps {
  title: string;
  content: string;
  roles: string[] | null;
}

const Article = ({ title, content, roles }: IProps) => {
  return (
    <section className='flex-grow overflow-y-auto flex flex-col items-center'>
      <header className='flex flex-col md:flex-row md:items-center space-y-2 w-full md:w-2/3 px-8 md:px-0'>
        <h1 className='pt-2 text-4xl font-bold'>{title}</h1>
        {roles?.includes('Administrators') && (
          <Link href={`/wiki/${title}/edit`}>
            <a
              onClick={() => {}}
              className='self-start md:self-end md:ml-auto bg-gray-400 hover:bg-gray-500 rounded px-3 py-1.5 cursor-pointer'
            >
              Edit
            </a>
          </Link>
        )}
      </header>
      <article className='pt-4 w-full md:w-2/3 px-8 md:px-0 text-justify'>
        <Markdown content={content} />
      </article>
    </section>
  );
};

export default Article;
