import {SearchParams} from '@/app/(nextjs)/[[...slug]]/page';

export const getPreview = async (props: SearchParams) => {
  const searchParams = await props.searchParams;
  return searchParams.mode === 'preview';
};

export default getPreview;
