import {CLOUDINARY_API_SECRET} from '@/constants';
import {DeliveryType, UploadApiResponse, v2 as cloudinary} from 'cloudinary';
import {APIError, CollectionAfterDeleteHook, CollectionAfterReadHook, CollectionConfig, Config, Plugin} from 'payload';
import {CustomCloudinaryFieldProps} from './CloudinaryUpload';

export type CustomCollectionConfig = CollectionConfig & {
  upload?: {
    private?: boolean;
  };
};

export const GROUP_NAME = 'cloudinary';

export type CloudinaryObject = {
  fileName: string;
  publicId: string;
  format: string;
  resourceType: string;
  cloudName: string;
  version: string;
  type: DeliveryType | undefined;
  url: string;
  thumbnailUrl?: string;
  mediumUrl?: string;
  largeUrl?: string;
  fileSize: number;
  width: number;
  height: number;
};

export const getCloudinaryObject = (
  file: File,
  uploadResponse: UploadApiResponse,
  cloudName: string
): CloudinaryObject => ({
  fileName: file.name,
  publicId: uploadResponse.public_id,
  format: uploadResponse.format,
  version: `v${uploadResponse.version}`,
  type: uploadResponse.type,
  cloudName,
  resourceType: uploadResponse.resource_type,
  url: uploadResponse.secure_url,
  fileSize: uploadResponse.bytes,
  width: uploadResponse.width,
  height: uploadResponse.height,
});

export type CloudinaryPluginConfig = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  uploadFolder: string;
};

const cloudinaryPlugin = (cloudinaryPluginConfig: CloudinaryPluginConfig) => {
  cloudinary.config({
    api_key: cloudinaryPluginConfig.apiKey,
    api_secret: cloudinaryPluginConfig.apiSecret,
    cloud_name: cloudinaryPluginConfig.cloudName,
  });

  const afterDeleteHook: CollectionAfterDeleteHook = async ({req, doc}) => {
    const cloudinaryObject = doc[GROUP_NAME] as CloudinaryObject;
    if (!cloudinaryObject) {
      return;
    }
    try {
      await cloudinary.uploader.destroy(cloudinaryObject.publicId, {
        type: cloudinaryObject.type,
        invalidate: true,
        resource_type: cloudinaryObject.resourceType,
      });
    } catch (e) {
      throw new APIError(`Cloudinary: ${JSON.stringify(e)}`);
    }
  };

  const afterReadHook: CollectionAfterReadHook = ({doc}) => {
    const cloudinaryObject = doc?.cloudinary as CloudinaryObject | undefined;
    const newDoc = {
      ...doc,
      width: cloudinaryObject?.width,
      height: cloudinaryObject?.height,
      thumbnailUrl: cloudinaryObject?.thumbnailUrl?.length
        ? cloudinaryObject.thumbnailUrl
        : cloudinaryObject?.publicId
          ? cloudinary.url(cloudinaryObject.publicId, {
              width: 500,
              type: cloudinaryObject!.type,
              resource_type: cloudinaryObject!.resourceType,
              sign_url: cloudinaryObject!.type === 'private' ? true : false,
            })
          : '',
      mediumUrl: cloudinaryObject?.mediumUrl?.length
        ? cloudinaryObject.mediumUrl
        : cloudinaryObject?.publicId
          ? cloudinary.url(cloudinaryObject.publicId, {
              width: 1000,
              type: cloudinaryObject!.type,
              resource_type: cloudinaryObject!.resourceType,
              sign_url: cloudinaryObject!.type === 'private' ? true : false,
            })
          : '',
      largeUrl: cloudinaryObject?.largeUrl?.length
        ? cloudinaryObject.largeUrl
        : cloudinaryObject?.publicId
          ? cloudinary.url(cloudinaryObject.publicId, {
              width: 2000,
              type: cloudinaryObject!.type,
              resource_type: cloudinaryObject!.resourceType,
              sign_url: cloudinaryObject!.type === 'private' ? true : false,
            })
          : '',
    };
    return newDoc;
  };

  return ((incomingConfig: Config): Config => {
    const config: Config = {
      ...incomingConfig,
      collections: (incomingConfig.collections || []).map((collection) => {
        if (!collection.upload || typeof collection.upload !== 'object') {
          return collection;
        }
        const upload = {...collection.upload} as NonNullable<CustomCollectionConfig['upload']>;
        return {
          ...collection,
          custom: {
            upload,
          },
          hooks: {
            ...collection.hooks,
            afterDelete: [...(collection.hooks?.afterDelete || []), afterDeleteHook],
            afterRead: [...(collection.hooks?.afterRead || []), afterReadHook],
          },
          endpoints: [
            {
              path: '/generate-signature',
              method: 'post',
              handler: async (req) => {
                try {
                  const formData = await req.formData?.();
                  const timestamp = formData?.get?.('timestamp')?.toString();
                  const folder = formData?.get?.('folder')?.toString();
                  const type = formData?.get?.('type')?.toString();
                  if (!timestamp) {
                    return Response.json({error: 'Missing required "timestamp" parameter.'}, {status: 400});
                  }
                  if (!folder) {
                    return Response.json({error: 'Missing required "folder" parameter.'}, {status: 400});
                  }
                  const signature = cloudinary.utils.api_sign_request(
                    {folder, timestamp: parseInt(timestamp), type: type || undefined},
                    CLOUDINARY_API_SECRET
                  );
                  return Response.json({signature}, {status: 200});
                } catch (error) {
                  console.error('Error generating Cloudinary signature:', error);
                  return Response.json({error: 'Failed to generate signature.'}, {status: 500});
                }
              },
            },
          ],
          fields: [
            {
              name: GROUP_NAME,
              type: 'json',
              required: true,
              admin: {
                custom: {
                  private: upload.private,
                  mimeTypes: collection.upload.mimeTypes,
                  cloudinaryPluginConfig,
                  collection: collection.slug,
                } as CustomCloudinaryFieldProps,
                components: {
                  Field: '@/payload/plugins/cloudinary/CloudinaryUpload',
                },
              },
            },
            {name: 'thumbnailUrl', type: 'text', admin: {hidden: true}},
            {name: 'mediumUrl', type: 'text', admin: {hidden: true}},
            {name: 'largeUrl', type: 'text', admin: {hidden: true}},
            {name: 'width', type: 'number', admin: {hidden: true}},
            {name: 'height', type: 'number', admin: {hidden: true}},
            {name: 'description', type: 'text'},
            {name: 'copyright', type: 'text'},
            ...collection.fields,
          ],
          admin: {
            ...collection.admin,
            useAsTitle: 'description',
          },
          upload: false,
        };
      }),
    };
    return config;
  }) as Plugin;
};

export default cloudinaryPlugin;
