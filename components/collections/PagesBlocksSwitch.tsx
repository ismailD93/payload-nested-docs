'use client';

import TextBlock from '@/components/blocks/TextBlock';
import {BlogPost, Page} from '@/payload-types';
import {FC, Fragment} from 'react';
import BlogsOverview from '../blocks/BlogsOverview';
import PLBogPage from '../contentTypes/PLPage';

type Unarray<T> = T extends Array<infer U> ? U : T;
type PageBlocks = Page['blocks'];
type PageBlockType = Unarray<Page['blocks']>['blockType'];

export type ProjectPageBlockType =
  Unarray<BlogPost['blocks']> extends infer Block
    ? Block extends {blockType: string}
      ? Block['blockType']
      : never
    : never;

export type PageBlockBaseType<T extends PageBlockType, E = {}> = {
  block: Extract<Unarray<PageBlocks>, {blockType: T}>;
} & E;

const getBlockComponent = (blockType: PageBlockType) => {
  switch (blockType) {
    case 'textBlock':
      return TextBlock;
    case 'blogList':
      return BlogsOverview;
    default:
      return null;
  }
};

export const getBlogPostPageComponent = (blockType: ProjectPageBlockType) => {
  switch (blockType) {
    case 'textBlock':
      return TextBlock;
    default:
      return null;
  }
};

const PagesBlocksSwitch: FC<{
  blocks: PageBlocks;
  page: Page;
  blogPage: BlogPost;
}> = ({blocks, blogPage}) => {
  if (!!blogPage.slug) return <PLBogPage blocks={blogPage} />;

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const BlockComponent = getBlockComponent(block.blockType);
        if (BlockComponent == null) return null;
        // @ts-ignore
        return <BlockComponent animate key={index} block={block} />;
      })}
    </Fragment>
  );
};

export default PagesBlocksSwitch;
