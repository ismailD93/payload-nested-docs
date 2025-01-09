'use client';

import {FC} from 'react';
import {BlogPost} from '@/payload-types';
import {getBlogPostPageComponent} from '../collections/PagesBlocksSwitch';

interface PLPageProps {
  blocks: BlogPost;
}

const PLBogPage: FC<PLPageProps> = ({blocks}) => {
  return (
    <div>
      {blocks.blocks?.map((block, index) => {
        const BlockComponent = getBlogPostPageComponent(block.blockType);
        if (BlockComponent === null) return null;
        return (
          <div key={index}>
            {/*  @ts-ignore */}
            <BlockComponent key={index} block={block} />
          </div>
        );
      })}
    </div>
  );
};

export default PLBogPage;
