import { useRouter } from 'next/router';
import { useState } from 'react';
import Checkbox from './Checkbox';

import Markdown from './Markdown';

interface IProps {
  title: string;
  initialContent: string;
}

const Editor = ({ title, initialContent }: IProps) => {
  const router = useRouter();

  const [content, setContent] = useState(initialContent);
  const [preview, setPreview] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    setErrorMessage('');

    const body = JSON.stringify({
      title,
      content,
    });

    const response = await fetch('/api/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (response.ok) {
      router.push(`/wiki/${title}`);
    } else {
      const data = await response.json();

      setErrorMessage(data.message);
    }
  };

  return (
    <section className='mx-auto w-full h-full md:w-2/3 llex-grow overflow-y-auto flex flex-col items-center'>
      <header className='md:px-0 self-start'>
        <h1 className='pt-2 text-4xl font-bold'>{`${title} (edit)`}</h1>
      </header>
      <div className='w-full pt-4 px-12 md:px-4 flex justify-between self-start'>
        <Checkbox label='Preview' checked={preview} onChange={setPreview} />
        <button
          onClick={handleSubmit}
          className='self-end bg-gray-400 hover:bg-gray-500 rounded px-3 py-1.5 cursor-pointer'
        >
          Submit
        </button>
      </div>
      <div className='w-full pt-2 px-4 text-red-500'>{errorMessage}</div>
      <div className='flex flex-col flex-grow w-full h-full px-8 md:px-0'>
        {preview ? (
          <div className='flex-grow p-4'>
            <Markdown content={content} />
          </div>
        ) : (
          <textarea
            className='font-mono text-sm focus:outline-none resize-none w-full h-full my-4 p-4 rounded border border-gray-400'
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
        )}
      </div>
    </section>
  );
};

export default Editor;
