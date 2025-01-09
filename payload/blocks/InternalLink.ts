import {Block} from 'payload';

const InternalLink: Block = {
  slug: 'internalLink',
  fields: [
    {name: 'label', type: 'text', required: true},
    {
      name: 'link',
      type: 'relationship',
      relationTo: ['pages', 'blogPosts'],
      hasMany: false,
      required: true,
      admin: {allowCreate: false},
    },
  ],
};

export default InternalLink;
