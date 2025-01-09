import {NEXT_PUBLIC_SERVER_URL, NODE_ENV} from '@/constants';
import TextBlock from '@/payload/blocks/TextBlock';
import {CollectionConfig} from 'payload';
import {addSlugsHook} from '../hooks/addSlugsHook';

const BlogPosts: CollectionConfig = {
  slug: 'blogPosts',
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
              unique: true,
              admin: {readOnly: true},
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'blocks',
              type: 'blocks',
              blocks: [TextBlock],
              maxRows: 1,
              required: false,
            },
          ],
        },
      ],
    },
  ],
};

export default BlogPosts;
