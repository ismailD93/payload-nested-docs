import {NEXT_PUBLIC_SERVER_URL, NODE_ENV} from '@/constants';

import {addSlugsHook} from '../hooks/addSlugsHook';
import {CustomCollectionConfig} from '../plugins/cloudinary/plugin';
import TextBlock from '../blocks/TextBlock';
import HeaderSubNav from '../blocks/HeaderSubNav';
import BlogList from '../blocks/BlogList';

const Pages: CustomCollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  custom: {
    sitemap: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    hideAPIURL: NODE_ENV === 'production',
    livePreview: {
      url: ({data}) => {
        const url = NEXT_PUBLIC_SERVER_URL;
        let tmpPath: string = data.slug || '';
        if (!tmpPath.startsWith('/')) tmpPath = `/${tmpPath}`;
        if (tmpPath.endsWith('/')) tmpPath = tmpPath.slice(0, -1);
        return url + tmpPath + `?mode=preview`;
      },
    },
  },
  timestamps: true,
  hooks: {
    beforeValidate: [addSlugsHook],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: {readOnly: true},
            },
            {
              name: 'author',
              type: 'text',
              required: true,
              unique: false,
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'blocks',
              type: 'blocks',
              blocks: [TextBlock, HeaderSubNav, BlogList],
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'sortOrder',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Sortierung der Pages in der Sub-Navigation. Umso kleiner die Zahl, desto weiter vorne.',
      },
    },
  ],
};

export default Pages;
