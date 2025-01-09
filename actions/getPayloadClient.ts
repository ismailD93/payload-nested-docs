'use server';

import configPromise from '@payload-config';
import {getPayload} from 'payload';

const getPayloadClient = async () => {
  return await getPayload({config: configPromise});
};

export default getPayloadClient;
