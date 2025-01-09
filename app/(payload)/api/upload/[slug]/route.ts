import getPayloadClient from '@/actions/getPayloadClient';
import {Params} from '@/app/(nextjs)/[[...slug]]/page';
import {CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_FOLDER} from '@/constants';
import {CustomCollectionConfig, getCloudinaryObject, GROUP_NAME} from '@/payload/plugins/cloudinary/plugin';
import {v2 as cloudinary, UploadApiResponse} from 'cloudinary';
import {NextRequest, NextResponse} from 'next/server';
import {Readable} from 'stream';

const uploadFileToCloudinary = async (file: File, privateType?: boolean): Promise<UploadApiResponse | undefined> => {
  const arrayBuffer = await file.arrayBuffer();
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        type: privateType ? 'private' : undefined,
        folder: CLOUDINARY_UPLOAD_FOLDER,
      },
      (error, result) => {
        if (error) return reject(undefined);
        resolve(result);
      }
    );

    const buffer = Buffer.from(arrayBuffer);
    const stream = Readable.from(buffer);
    stream.pipe(uploadStream);
  });
};

export const POST = async (req: NextRequest, args: Params<{slug: string}>) => {
  try {
    const collectionSlug = (await args.params).slug;
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const description = (formData.get('description') || undefined) as string | undefined;
    const copyright = (formData.get('copyright') || undefined) as string | undefined;

    if (!file) return NextResponse.json({error: 'no file'}, {status: 500});

    const payload = await getPayloadClient();
    const collection = payload.config.collections.find((item) => item.slug == collectionSlug);

    if (!collection) return NextResponse.json({error: 'invalid collection'}, {status: 500});

    const upload = collection.custom?.upload as NonNullable<CustomCollectionConfig['upload']> | undefined;

    if (!upload) return NextResponse.json({error: 'invalid collection upload'}, {status: 500});

    cloudinary.config({
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
      cloud_name: CLOUDINARY_CLOUD_NAME,
    });
    const uploadResponse = await uploadFileToCloudinary(file, upload.private);

    if (!uploadResponse) return NextResponse.json({error: 'upload failed'}, {status: 500});

    const cloudinaryObject = getCloudinaryObject(file as any, uploadResponse, CLOUDINARY_CLOUD_NAME);
    const data = {
      description,
      copyright,
      [GROUP_NAME]: cloudinaryObject,
    };
    const payloadResponse = await payload.create({collection: collection.slug as any, data, depth: 1});
    return NextResponse.json({doc: payloadResponse}, {status: 200});
  } catch (error) {
    return NextResponse.json({error: (error as Error).message}, {status: 500});
  }
};
