import {PageBlockBaseTypeUnionBlogs} from '@/components/utils/types';
import {Page} from '@/payload-types';
import {getBlogPosts} from './getBlogPosts';

const handleBlogsOverview = async (item: PageBlockBaseTypeUnionBlogs) => {
  const blogs = await getBlogPosts();

  item.blogs = blogs;
  return item;
};

export const enrichPage = async (blocks: Page['blocks']) => {
  let tempBlocks = [...blocks];

  for (let i = 0; i < tempBlocks.length; i++) {
    let block = tempBlocks[i];
    if (block.blockType === 'blogList') {
      block = await handleBlogsOverview(block);
    }
    tempBlocks[i] = block;
  }
  return tempBlocks;
};
