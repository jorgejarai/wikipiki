import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

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
          const unescaped = href
            ?.replace(/\\_/g, '%5C')
            .replace(/_/g, ' ')
            .replace(/%5C/g, '_');

          if (unescaped === undefined) {
            return null;
          }

          const urlEncoded = encodeURIComponent(unescaped);

          if (urlEncoded.includes(':')) {
            // Outgoing hyperlink (has a scheme defined)

            return (
              <a className='text-blue-700' href={urlEncoded} {...props}>
                {children}
              </a>
            );
          } else if (urlEncoded.startsWith('%2F')) {
            // Absolute hyperlink

            return (
              <Link href={`/${unescaped.slice(1)}`} {...props}>
                <a className='text-blue-700'>{children}</a>
              </Link>
            );
          } else {
            // Hyperlink to an article (has no scheme nor refers to a path)

            return (
              <Link href={`/wiki/${urlEncoded}`} {...props}>
                <a className='text-blue-700'>{children}</a>
              </Link>
            );
          }
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
