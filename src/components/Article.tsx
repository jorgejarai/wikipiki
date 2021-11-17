import Link from 'next/link';

import { useRoles } from '../auth/RolesContext';
import Markdown from './Markdown';

interface IProps {
  showEdit?: boolean;
  title: string;
  content: string;
}

const Article = ({ showEdit = true, title, content }: IProps) => {
  const roles = useRoles();

  return (
    <section className='flex-grow overflow-y-auto flex flex-col items-center'>
      <header className='flex flex-row items-center space-y-2 w-full md:w-2/3 px-8 md:px-0'>
        <h1 className='flex-grow pt-2 text-4xl font-bold truncate'>{title}</h1>
        {roles?.includes('Administrators') && showEdit && (
          <Link href={`/wiki/${title}/edit`}>
            <a
              onClick={() => {}}
              className='bg-gray-400 hover:bg-gray-500 rounded px-3 py-1.5 cursor-pointer'
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
