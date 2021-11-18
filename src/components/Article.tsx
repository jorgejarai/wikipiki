import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

import { useRoles } from '../auth/RolesContext';
import Markdown from './Markdown';

interface IProps {
  showEdit?: boolean;
  title: string;
  content: string;
}

const Article = ({ showEdit = true, title, content }: IProps) => {
  const roles = useRoles();

  const [showRename, setShowRename] = useState(false);

  return (
    <section className='flex-grow overflow-y-auto flex flex-col items-center'>
      <header className='flex flex-row items-center space-y-2 w-full md:w-2/3 px-8 md:px-0'>
        <h1 className='flex-grow pt-2 text-4xl font-bold truncate'>{title}</h1>
        {roles?.includes('Administrators') && showEdit && (
          <>
            <a
              onClick={() => setShowRename(true)}
              className='bg-gray-400 hover:bg-gray-500 rounded px-3 py-1.5 cursor-pointer mr-2'
            >
              Rename
            </a>
            <Link href={`/wiki/${title}/edit`}>
              <a
                onClick={() => {}}
                className='bg-gray-400 hover:bg-gray-500 rounded px-3 py-1.5 cursor-pointer'
              >
                Edit
              </a>
            </Link>
          </>
        )}
      </header>
      <article className='pt-4 w-full md:w-2/3 px-8 md:px-0 text-justify'>
        <Markdown content={content} />
      </article>
      <RenameDialog title={title} show={showRename} setShow={setShowRename} />
    </section>
  );
};

interface IRenameDialogProps {
  title: string;
  show: boolean;
  setShow: (show: boolean) => void;
}

const RenameDialog = ({ title, show, setShow }: IRenameDialogProps) => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    setNewTitle(title);
  }, []);

  const handleSubmit = async () => {
    setErrorMessage('');

    const body = JSON.stringify({ newTitle });

    const urlEncoded = encodeURIComponent(title);

    const response = await fetch(`/api/wiki/${urlEncoded}/rename`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    const payload = await response.json();

    if (response.ok && !payload.error) {
      router.push(`/wiki/${newTitle}`);
      setShow(false);
    } else {
      setErrorMessage(payload.description);
    }
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={() => setShow(false)}
      >
        <div className='min-h-screen px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0' />
          </Transition.Child>

          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
              <Dialog.Title
                as='h3'
                className='text-lg font-medium leading-6 text-gray-900'
              >
                Rename article
              </Dialog.Title>

              <div className='flex flex-col space-y-1 mt-2'>
                <input
                  type='search'
                  className='rounded bg-gray-300 px-2 py-1 h-9 w-full'
                  placeholder='New title'
                  value={newTitle}
                  onChange={(event) => {
                    setShow(true);
                    setNewTitle(event.target.value);
                  }}
                />
                {errorMessage !== '' && (
                  <div className='rounded w-full px-1 text-red-600'>
                    {errorMessage}
                  </div>
                )}
              </div>

              <div className='flex justify-end space-x-1 mt-4'>
                <button
                  type='button'
                  className='flex items-center justify-center h-6 md:h-9 px-2 md:px-3 py-4 md:py-1.5 bg-gray-400 hover:bg-gray-500 rounded mr-2 cursor-pointer'
                  onClick={() => setShow(false)}
                >
                  Cancel
                </button>
                <button
                  type='button'
                  className='flex items-center justify-center h-6 md:h-9 px-2 md:px-3 py-4 md:py-1.5 bg-gray-400 hover:bg-gray-500 rounded mr-2 cursor-pointer'
                  onClick={handleSubmit}
                >
                  OK
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Article;
