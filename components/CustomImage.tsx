'use client';

import NextImage, {ImageProps} from 'next/image';
import {FC} from 'react';
import {PayloadImageType} from './utils/types';

export const IMAGE_SIZES = `(max-width: 640px) 640px, (max-width: 750) 750px, (max-width: 828px) 828px, (max-width: 1080px) 1080px, (max-width: 1200px) 1200px, 1920px`;

export type CustomImageComponentProps = {
  image: PayloadImageType;
  type?: 'large' | 'medium';
  src?: never;
  alt?: never;
} & Partial<ImageProps>;

const CustomImage: FC<CustomImageComponentProps> = ({image, type = 'large', ...props}) => {
  if (!image || typeof image !== 'object') return null;

  let src;

  if (type === 'medium') {
    src = image?.mediumUrl;
  } else {
    src = image?.largeUrl;
  }

  if (!src) return null;

  return (
    <NextImage
      {...props}
      src={src}
      alt={[image.description, image.copyright ? `© ${image.copyright}` : undefined]
        .filter((item) => !!item)
        .join(' ')}
    />
  );
};

export default CustomImage;
