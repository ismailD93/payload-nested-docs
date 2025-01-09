import {NODE_ENV} from '@/constants';
import {CustomCollectionConfig} from '../plugins/cloudinary/plugin';

const Users: CustomCollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    hideAPIURL: NODE_ENV === 'production',
  },
  auth: true,
  timestamps: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
};

export default Users;
