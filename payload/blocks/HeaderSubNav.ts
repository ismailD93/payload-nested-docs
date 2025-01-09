import {Block} from 'payload';
import SubNavItem from './SubNavItem';

const HeaderSubNav: Block = {
  slug: 'headerSubNav',
  fields: [
    {name: 'subTitle', type: 'text'},
    {name: 'title', type: 'text', required: true},
    {
      name: 'headerImage',
      type: 'relationship',
      relationTo: 'images',
      hasMany: false,
      admin: {allowCreate: true},
      required: true,
    },
    {
      name: 'subNavLinks',
      type: 'blocks',
      maxRows: 8,
      required: true,
      blocks: [SubNavItem],
    },
  ],
};

export default HeaderSubNav;
