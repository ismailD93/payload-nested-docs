import {getPayload} from 'payload';
import configPromise from 'payload.config';

export const getNavigation = async () => {
  const payload = await getPayload({config: configPromise});
  return await payload.findGlobal({
    slug: 'navigation',
  });
};
