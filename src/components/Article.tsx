interface IProps {
  title: string;
  breadcrumbs: string[];
}

const Article = ({ title, breadcrumbs }: IProps) => {
  return (
    <section className='flex-grow overflow-y-auto flex flex-col items-center'>
      <header className='w-full md:w-2/3 px-8 md:px-0'>
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
        <h1 className='pt-2 text-4xl font-bold'>{title}</h1>
      </header>
      <article className='pt-4 w-full md:w-2/3 px-8 md:px-0 text-justify'>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta,
          voluptatem non. Odit rem dolores non tempore velit, facilis
          perspiciatis ex nisi! Porro in illum exercitationem, fugiat quas
          atque! Laboriosam, ducimus.
        </p>
      </article>
    </section>
  );
};

export default Article;
