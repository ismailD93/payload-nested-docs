import {BlogPost, Image, Page} from '@/payload-types';

export type Unarray<T> = T extends Array<infer U> ? U : T;
export type PayloadImageType = string | Image | undefined | null;
export type PayloadLinkType = string | Page;
export type PageBlockType = Unarray<Page['blocks']>['blockType'];
export type PageBlocks = Page['blocks'];
export type EnrichBlockType<T extends PageBlockType, E = {}> = Extract<Unarray<PageBlocks>, {blockType: T}> & E;

export type PageBlockEnrichedType<T> = {
  block: T;
};
export interface PageBlockBaseTypeUnionBlogs extends EnrichBlockType<'blogList'> {
  blogs?: BlogPost[];
}

export interface LinkType {
  label: string;
  link: string | Page;
  id?: string | null | undefined;
  blockName?: string | null | undefined;
  blockType: 'internalLink';
}
