import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

interface IProps {
  content: string;
}

const Markdown = ({ content }: IProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        a: ({ children, href, ...props }) => {
          if (href?.includes(':')) {
            // Outgoing hyperlink (has a scheme defined)

            const urlEncoded = encodeURIComponent(href);

            return (
              <a className='text-blue-700' href={urlEncoded} {...props}>
                {children}
              </a>
            );
          } else if (href?.startsWith('/')) {
            // Absolute hyperlink

            const urlEncoded = encodeURIComponent(href.slice(1));

            return (
              <Link href={`/${urlEncoded}`} {...props}>
                <a className='text-blue-700'>{children}</a>
              </Link>
            );
          } else if (href !== undefined) {
            // Hyperlink to an article (has no scheme nor refers to a path)

            const urlEncoded = encodeURIComponent(href);

            return (
              <Link href={`/wiki/${urlEncoded}`} {...props}>
                <a className='text-blue-700'>{children}</a>
              </Link>
            );
          }

          // Invalid link
          return null;
        },
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter language={match[1]} PreTag='div'>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code
              className={`${
                className !== undefined ? `${className} ` : ''
              }bg-gray-200 px-1 py-0.5 rounded`}
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;
