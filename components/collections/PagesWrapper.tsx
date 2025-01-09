'use client';

import LivePreview from '@/components/setup/LivePreview';
import {BlogPost, Page} from '@/payload-types';
import {FC} from 'react';
import PagesBlocksSwitch from './PagesBlocksSwitch';

const PagesWrapper: FC<{
  page: Page;
  blogPage: BlogPost;
  preview?: boolean;
}> = ({page, preview, blogPage}) => {
  if (!preview) {
    return <PagesBlocksSwitch blogPage={blogPage} blocks={page.blocks} page={page} />;
  }
  return (
    <LivePreview initialData={page}>
      {({}) => {
        return <PagesBlocksSwitch blogPage={blogPage} blocks={page.blocks} page={page} />;
      }}
    </LivePreview>
  );
};

export default PagesWrapper;
