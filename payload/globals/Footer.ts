import {GlobalConfig} from 'payload';
import InternalLink from '../blocks/InternalLink';

const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    {
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'street',
          type: 'text',
        },
        {
          name: 'country',
          type: 'text',
        },
        {
          name: 'tel',
          type: 'text',
        },
        {
          name: 'email',
          type: 'text',
        },
      ],
    },
    {
      name: 'footerLinks',
      type: 'blocks',
      blocks: [InternalLink],
      localized: true,
    },
  ],
};

export default Footer;
