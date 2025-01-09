import escapeHTML from 'escape-html';
import Link from 'next/link';
import {FC, Fragment} from 'react';
import {Text} from 'slate';

type Richtext = {
  [k: string]: any;
}[];

type LinkNode =
  | {type: 'link'; linkType: 'custom'; url: string; newTab: boolean; children: Richtext}
  | {
      type: 'link';
      linkType: 'internal';
      newTab: boolean;
      doc: {relationTo: string; value: {id: string; slug: string; title: string}};
      children: Richtext;
    };

const RichtextRender: FC<{
  content: Richtext;
}> = ({content}) => {
  const serialize = (content: Richtext) =>
    content.map((node, i) => {
      if (!node) {
        return null;
      }
      if (Text.isText(node)) {
        let text = <span dangerouslySetInnerHTML={{__html: escapeHTML(node.text)}} />;
        if ((node as any).bold) {
          text = <strong key={i}>{text}</strong>;
        }

        if ((node as any).code) {
          text = <code key={i}>{text}</code>;
        }

        if ((node as any).italic) {
          text = <em key={i}>{text}</em>;
        }

        if ((node as any).text === '') {
          text = <br />;
        }
        return <Fragment key={i}>{text}</Fragment>;
      }

      switch (node.type) {
        case 'h1':
          return (
            <h1 key={i} className='text-6xl'>
              {serialize(node.children)}
            </h1>
          );
        case 'h2':
          return (
            <h2 key={i} className='text-4xl'>
              {serialize(node.children)}
            </h2>
          );
        case 'h3':
          return (
            <h3 key={i} className='text-2xl mb-3'>
              {serialize(node.children)}
            </h3>
          );
        case 'h4':
          return (
            <h4 key={i} className='text-xl mb-3'>
              {serialize(node.children)}
            </h4>
          );
        case 'ul':
          return (
            <ul key={i} className='list-disc ml-5'>
              {serialize(node.children)}
            </ul>
          );
        case 'li':
          return (
            <li key={i} className='pl-1 pb-3 last:pb-0'>
              {serialize(node.children)}
            </li>
          );
        case 'link':
          const linkNode = node as LinkNode;

          if (linkNode.linkType === 'custom') {
            return (
              <Link
                href={escapeHTML(linkNode.url)}
                key={i}
                rel={linkNode.newTab ? 'noopener noreferrer' : undefined}
                target={linkNode.newTab ? '_blank' : '_self'}
                className='text-primary cursor-pointer text-yellow max-w-max items-center gap-x-2.5'>
                {serialize(linkNode.children)}
              </Link>
            );
          } else if (linkNode.linkType === 'internal') {
            return (
              <Link
                href={escapeHTML(linkNode.doc.value.slug)}
                key={i}
                rel={linkNode.newTab ? 'noopener noreferrer' : undefined}
                target={linkNode.newTab ? '_blank' : '_self'}
                className='text-primary cursor-pointer max-w-max text-yellow items-center gap-x-2.5'>
                {serialize(linkNode.children)}
              </Link>
            );
          } else return null;
        default:
          return <p key={i}>{serialize(node.children)}</p>;
      }
    });

  return <Fragment>{serialize(content)}</Fragment>;
};

export default RichtextRender;
