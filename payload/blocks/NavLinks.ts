import {Block} from 'payload';
import ExternalLink from './ExternalLinks';
import InternalLink from './InternalLink';

const NavLinks: Block = {
  slug: 'navLinks',
  fields: [
    {name: 'label', type: 'text', required: true},
    {
      name: 'link',
      type: 'relationship',
      relationTo: 'pages',
      hasMany: false,
      admin: {allowCreate: false},
    },
    {
      name: 'subNavLinks',
      type: 'blocks',
      maxRows: 8,
      blocks: [InternalLink, ExternalLink],
    },
  ],
};

export default NavLinks;
