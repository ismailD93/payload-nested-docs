import {Block} from 'payload';

const ExternalLink: Block = {
  slug: 'externalLink',
  fields: [
    {name: 'label', type: 'text', required: true},
    {name: 'link', type: 'text', required: true},
  ],
};

export default ExternalLink;
