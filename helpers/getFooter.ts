import {getPayload} from 'payload';
import configPromise from 'payload.config';

export const getFooter = async () => {
  const payload = await getPayload({config: configPromise});
  return await payload.findGlobal({
    slug: 'footer',
  });
};
