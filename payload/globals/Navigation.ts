import {GlobalConfig} from 'payload';
import NavLinks from '../blocks/NavLinks';

const Navigation: GlobalConfig = {
  slug: 'navigation',
  fields: [
    {
      name: 'links',
      type: 'blocks',
      required: true,
      blocks: [NavLinks],
    },
  ],
};

export default Navigation;
