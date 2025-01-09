import {Block} from 'payload';

const SubNavItem: Block = {
  slug: 'subNavItem',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'link',
      type: 'relationship',
      relationTo: 'pages',
      hasMany: false,
      required: true,
      admin: {allowCreate: false},
    },
  ],
};

export default SubNavItem;
