import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
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
            return (
              <a className='text-blue-700' href={href} {...props}>
                {children}
              </a>
            );
          } else if (href?.startsWith('/')) {
            // Absolute hyperlink
            return (
              <Link href={`${href}`} {...props}>
                <a className='text-blue-700'>{children}</a>
              </Link>
            );
          }

          // Hyperlink to an article (has no scheme nor refers to a path)
          return (
            <Link href={`/wiki/${href}`} {...props}>
              <a className='text-blue-700'>{children}</a>
            </Link>
          );
        },
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter language={match[1]} PreTag='div'>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
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
