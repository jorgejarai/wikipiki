import { useRouter } from 'next/router';
import { useState } from 'react';

import Checkbox from './Checkbox';
import Markdown from './Markdown';

interface IProps {
  create?: boolean;
  title?: string;
  initialContent?: string;
}

const Editor = ({
  create = false,
  title = '',
  initialContent = '',
}: IProps) => {
  const router = useRouter();

  const [newTitle, setNewTitle] = useState(title);
  const [content, setContent] = useState(initialContent);
  const [preview, setPreview] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    const body = JSON.stringify({
      title: create ? newTitle : title,
    });

    const response = await fetch('/api/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (response.ok) {
      router.push('/');
    } else {
      const data = await response.json();

      setErrorMessage(data.message);
    }
  };

  const handleSubmit = async () => {
    setErrorMessage('');

    const body = JSON.stringify(
      create ? { title: newTitle, content } : { title, content }
    );

    const response = await fetch(create ? '/api/new' : '/api/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (response.ok) {
      router.push(`/wiki/${create ? newTitle : title}`);
    } else {
      const data = await response.json();

      setErrorMessage(data.message);
    }
  };

  return (
    <section className='mx-auto w-full h-full md:w-2/3 llex-grow overflow-y-auto flex flex-col items-center space-y-2'>
      <header className='w-full px-8 md:px-0 self-start'>
        {create ? (
          <h1 className='pt-2 text-4xl font-bold'>Create a new article</h1>
        ) : (
          <h1 className='pt-2 text-4xl font-bold'>{`${title} (edit)`}</h1>
        )}
      </header>
      <div className='w-full px-8 md:px-0 pt-2 flex space-x-2 justify-end self-start'>
        <Checkbox label='Preview' checked={preview} onChange={setPreview} />
        <button
          onClick={handleDelete}
          className='bg-red-400 hover:bg-red-500 text-black rounded px-3 py-1.5 cursor-pointer'
        >
          Delete
        </button>
        <button
          onClick={handleSubmit}
          className='bg-gray-400 hover:bg-gray-500 rounded px-3 py-1.5 cursor-pointer'
        >
          Submit
        </button>
      </div>
      {errorMessage !== '' && (
        <div className='bg-red-300 rounded w-full px-4 py-3 text-red-800'>
          {errorMessage}
        </div>
      )}
      {create && (
        <div className='w-full px-8 md:px-0 flex justify-between self-start'>
          <input
            placeholder='Title'
            className='focus:outline-none border-gray-400 border p-2 w-full rounded'
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
      )}
      <div className='flex flex-col flex-grow w-full h-full px-8 md:px-0'>
        {preview ? (
          <div className='flex-grow p-4'>
            <Markdown content={content} />
          </div>
        ) : (
          <textarea
            placeholder='Write your article here'
            className='font-mono text-sm focus:outline-none resize-none w-full h-full p-4 rounded border border-gray-400'
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
        )}
      </div>
    </section>
  );
};

export default Editor;
