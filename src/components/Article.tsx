import Markdown from './Markdown';

interface IProps {
  title: string;
  breadcrumbs?: string[];
  content: string;
}

const Article = ({ title, breadcrumbs, content }: IProps) => {
  return (
    <section className='flex-grow overflow-y-auto flex flex-col items-center'>
      <header className='w-full md:w-2/3 px-8 md:px-0'>
        {breadcrumbs && (
          <div className='text-sm flex'>
            {breadcrumbs.map((crumb, idx) => {
              return (
                <div key={idx} className='cursor-pointer'>
                  {idx !== 0 && <span className='text-gray-400 px-1'>/</span>}
                  <span>{crumb}</span>
                </div>
              );
            })}
          </div>
        )}
        <h1 className='pt-2 text-4xl font-bold'>{title}</h1>
      </header>
      <article className='pt-4 w-full md:w-2/3 px-8 md:px-0 text-justify'>
        <Markdown content={content} />
      </article>
    </section>
  );
};

export default Article;
