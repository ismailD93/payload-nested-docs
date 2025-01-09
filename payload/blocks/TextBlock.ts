import {slateEditor} from '@payloadcms/richtext-slate';
import {Block} from 'payload';

const TextBlock: Block = {
  slug: 'textBlock',
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: slateEditor({
        admin: {
          elements: ['h3', 'h4', 'ul', 'link'],
          leaves: ['bold', 'italic'],
        },
      }),
    },
  ],
};

export default TextBlock;
