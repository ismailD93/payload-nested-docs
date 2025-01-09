import {BlogPost} from '@/payload-types';
import {getPayload} from 'payload';
import configPromise from 'payload.config';

export const getBlogPosts = async () => {
  const payload = await getPayload({config: configPromise});

  const data = await payload.find({
    collection: 'blogPosts',
    where: {_status: {equals: 'published'}},
  });
  // https://github.com/payloadcms/payload/issues/6799
  return data?.docs as any as BlogPost[] | undefined;
};
