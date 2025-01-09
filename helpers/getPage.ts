import {getPayload} from 'payload';
import {BlogPost, Config, Page} from '@/payload-types';
import configPromise from 'payload.config';
import {PayloadImageType} from '@/components/utils/types';

export interface PageExtended extends Page {
  subNavItems: {title: string; slug: string}[];
  pageOverview: {
    title: string;
    slug: string;
    headline: string | null | undefined;
    text: string | null | undefined;
    image: PayloadImageType;
    date: string | number | Date;
    author: string | null | undefined;
  }[];
}

export const getPage = async (slug: string): Promise<Page | undefined> => {
  const payload = await getPayload({config: configPromise});
  const data = await payload.find({
    collection: 'pages',
    where: {slug: {equals: `/${slug}`}},
  });
  return data?.docs?.[0];
};

export const getBlogPage = async (slug: string): Promise<BlogPost | undefined> => {
  const payload = await getPayload({config: configPromise});
  const data = await payload.find({
    collection: 'blogPosts',
    where: {slug: {equals: `/${slug}`}},
  });
  return data?.docs?.[0];
};
