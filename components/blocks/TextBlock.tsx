'use client';

import RenderRichtext from '@/components/generic/RenderRichtext';
import {FC} from 'react';
import {PageBlockBaseType} from '../collections/PagesBlocksSwitch';

const TextBlock: FC<PageBlockBaseType<'textBlock'>> = ({block}) => {
  if (!block?.content) return null;

  return (
    <div className='flex flex-col w-full my-20'>
      {!!block.content.length && <RenderRichtext content={block.content} />}
    </div>
  );
};

export default TextBlock;
