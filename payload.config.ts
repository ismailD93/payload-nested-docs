import Images from '@/payload/collections/Images';
import Pages from '@/payload/collections/Pages';
import Users from '@/payload/collections/Users';
import cloudinaryPlugin from '@/payload/plugins/cloudinary/plugin';
import {mongooseAdapter} from '@payloadcms/db-mongodb';
import {seoPlugin} from '@payloadcms/plugin-seo';
import path from 'path';
import {fileURLToPath} from 'url';

import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_FOLDER,
  DATABASE_URL,
  NEXT_PUBLIC_SERVER_URL,
  PAYLOAD_SECRET,
} from '@/constants';
import {slateEditor} from '@payloadcms/richtext-slate';
import {nestedDocsPlugin} from '@payloadcms/plugin-nested-docs';
import {buildConfig} from 'payload';
import Footer from './payload/globals/Footer';
import Navigation from './payload/globals/Navigation';
import BlogPosts from './payload/collections/BlogPosts';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const collectionConfig = [Users, Pages, Images, BlogPosts];

export const SitemapCollections = collectionConfig
  .filter((collection) => !!collection.custom?.sitemap)
  .map((collection) => collection.slug);

const config = buildConfig({
  admin: {
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: collectionConfig,
  editor: slateEditor({}),
  globals: [Footer, Navigation],
  secret: PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: DATABASE_URL,
    transactionOptions: false,
  }),
  plugins: [
    cloudinaryPlugin({
      cloudName: CLOUDINARY_CLOUD_NAME,
      apiKey: CLOUDINARY_API_KEY,
      apiSecret: CLOUDINARY_API_SECRET,
      uploadFolder: CLOUDINARY_UPLOAD_FOLDER,
    }),
    seoPlugin({
      collections: ['pages'],
      generateURL: ({doc}) => `${NEXT_PUBLIC_SERVER_URL}/${doc?.slug?.value}`,
      tabbedUI: true,
      fields: ({defaultFields}) => [
        ...defaultFields,
        {name: 'image', label: 'Image', required: false, type: 'relationship', relationTo: 'images'},
      ],
    }),
    nestedDocsPlugin({
      collections: ['pages'],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: (docs) => docs.reduce((url, doc) => `${doc?.slug}`, ''),
    }),
  ],
});

export default config;
