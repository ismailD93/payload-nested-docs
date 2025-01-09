import PagesWrapper from '@/components/collections/PagesWrapper';
import {enrichPage} from '@/helpers/enrichPage';
import {getBlogPage, getPage} from '@/helpers/getPage';
import getPreview from '@/helpers/getPreview';
import {BlogPost, Page} from '@/payload-types';
import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {FC} from 'react';
export type Params<T extends {} = {}> = {
  params: Promise<T>;
};

export type SearchParams<T extends {} = {}> = {
  searchParams: Promise<T & {mode?: 'preview'}>;
};

type PageProps = Params<{slug: string[]}> & SearchParams<{mode?: 'preview'}>;

const getSlug = async (props: PageProps) => {
  const params = await props.params;
  return params.slug?.join?.('/') || '';
};

export const generateMetadata = async (props: PageProps): Promise<Metadata | null> => {
  const slug = await getSlug(props);
  let page: Page | undefined = await getPage(slug);
  if (!page) {
    page = await getPage(slug);
  }
  const image = typeof page?.meta?.image === 'object' ? page.meta.image : undefined;

  return {
    title: page?.meta?.title || undefined,
    description: page?.meta?.description || undefined,
    openGraph: {
      type: 'website',
      siteName: 'Architekturwerkstatt dworzak-grabher',
      images: image?.mediumUrl || '',
    },
  };
};

const Route: FC<PageProps> = async (props) => {
  const preview = await getPreview(props);
  const slug = await getSlug(props);
  const page = await getPage(slug);
  const blogPage = await getBlogPage(slug);
  if (!page && !blogPage) return notFound();
  if (page) {
    page.blocks = await enrichPage(page?.blocks);
  }

  return <PagesWrapper blogPage={blogPage || ({} as BlogPost)} page={page || ({} as Page)} preview={preview} />;
};

export default Route;
