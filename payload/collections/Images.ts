import {NODE_ENV} from '@/constants';
import {CustomCollectionConfig} from '../plugins/cloudinary/plugin';

const Images: CustomCollectionConfig = {
  slug: 'images',
  admin: {
    hideAPIURL: NODE_ENV === 'production',
  },
  upload: {
    mimeTypes: ['image/*'],
  },
  timestamps: true,
  fields: [],
};

export default Images;
